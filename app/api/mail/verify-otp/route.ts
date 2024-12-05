import Otp from "@/database/otp.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { otp, email } = await req.json();
    const errors = [];
    let error = false;
    if (!otp) {
      error = true;
      errors.push({ code: "otp_required", message: "Otp is required" });
    }

    if (!email) {
      error = true;
      errors.push({ code: "email_required", message: "Email is required" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = true;
      errors.push({ code: "email_invalid", message: "Email is invalid" });
    }

    const user = await User.findOne({ email });
    if (user?.verified) {
      error = true;
      errors.push({
        code: "user_already_verified",
        message: "User is already verified",
      });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    const isExistingOtp = await Otp.findOne({ email });
    if (!isExistingOtp) {
      error = true;
      errors.push({
        code: "otp_not_found",
        message: "Otp not found for this email, please try again",
      });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    if (isExistingOtp.expiresAt < Date.now()) {
      error = true;
      errors.push({
        code: "otp_expired",
        message: "Otp is expired, please try again",
      });
    } else {
      const isOtpValid = await compare(otp, isExistingOtp.otp || "");
      if (!isOtpValid) {
        error = true;
        errors.push({ code: "otp_invalid", message: "Otp is invalid" });
      }
    }

    if (error) {
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    const deletedOtp = await Otp.findOneAndDelete({ email });

    if (!deletedOtp) {
      errors.push({
        code: "otp_not_deleted",
        message: "Something went wrong, Otp not deleted",
      });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { verified: true } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      errors.push({
        code: "user_not_updated",
        message: "Something went wrong, user not updated",
      });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      errors: null,
      payload: updatedUser,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        errors: [
          {
            code: "server_error",
            message: error,
          },
        ],
        payload: null,
        status: 500,
      },
      { status: 500 }
    );
  }
}
