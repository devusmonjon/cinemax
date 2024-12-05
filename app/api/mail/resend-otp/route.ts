import Otp from "@/database/otp.model";
import { transporter } from "@/lib/mail";
import { connectToDatabase } from "@/lib/mongoose";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();
    const existOtp = await Otp.findOne({ email });

    if (!existOtp) {
      return NextResponse.json(
        {
          errors: [
            {
              code: "otp_not_found",
              message: "Otp not found for this email, please try again",
            },
          ],
          payload: null,
          status: 400,
        },
        { status: 400 }
      );
    }

    const otpCode = Math.floor(Math.random() * 1000000);
    const otpHash = await hash(otpCode.toString(), 10);
    const otpExpiry = new Date().setMinutes(new Date().getMinutes() + 10);

    const otp = await Otp.findOneAndUpdate(
      { email },
      { $set: { otp: otpHash, expiresAt: otpExpiry } },
      { new: true }
    );

    if (!otp) {
      return NextResponse.json(
        {
          errors: [
            {
              code: "otp_error",
              message: "Something went wrong, please try again",
            },
          ],
          payload: null,
          status: 400,
          success: true,
        },
        { status: 400 }
      );
    }

    const mail = await transporter.sendMail({
      from: process.env.MAIL_USER!,
      to: email,
      subject: "CineMax - OTP",
      html: `
      <div style="text-align: center;">
        <h1 style="color: #333;">Welcome to CineMax!</h1>
        <p style="font-size: 18px;">Hi ${email},</p>
        <p style="font-size: 18px;">Your OTP is: ${otpCode}</p>
        <p style="font-size: 18px;">This OTP is expires at ${new Date(
          otpExpiry
        ).toLocaleString()}.</p>
        <p style="font-size: 18px;">Please use this OTP to verify your account.</p>
      </div>
    `,
    });

    if (!mail) {
      return NextResponse.json(
        {
          errors: [
            {
              code: "otp_mail_error",
              message: "Something went wrong, please try again",
            },
          ],
          payload: null,
          status: 400,
          success: true,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        errors: null,
        payload: "Otp was resent successfully",
        status: 200,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
