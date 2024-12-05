import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { transporter } from "@/lib/mail";
import Otp from "@/database/otp.model";

export async function POST(req: Request) {
  let error: boolean = false;
  const errors: { code: string; message: string }[] = [];
  try {
    await connectToDatabase();
    const { email, password, username, fullName } = await req.json();

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    const usernameExists = await User.findOne({
      username: username.toLowerCase(),
    });

    if (emailExists || usernameExists) {
      error = true;
      if (emailExists)
        errors.push({
          code: "email_exist",
          message: "Email already exists",
        });
      if (usernameExists)
        errors.push({
          code: "username_exist",
          message: "Username already exists",
        });
    }
    const hashedPassword = await hash(password, 10);

    if (error) {
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      fullName,
    });
    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const otpHash = await hash(otp, 10);
    const otpExpiry = new Date().setMinutes(new Date().getMinutes() + 10);

    const checkOtpsuccess = await Otp.create({
      email,
      otp: otpHash,
      expiresAt: otpExpiry,
    });

    if (!checkOtpsuccess) {
      error = true;
      errors.push({ code: "otp_error", message: "Something went wrong" });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }
    const mailSend = await transporter.sendMail({
      from: process.env.MAIL_USER || "",
      to: email,
      subject: "CineMax - verify your account!",
      html: `
      <div style="text-align: center;">
        <h1 style="color: #333;">Welcome to CineMax!</h1>
        <p style="font-size: 18px;">Hi ${email},</p>
        <p style="font-size: 18px;">Your OTP is: ${otp}</p>
        <p style="font-size: 18px;">This OTP is expires at ${new Date(
          otpExpiry
        ).toLocaleString()}.</p>
        <p style="font-size: 18px;">Please use this OTP to verify your account.</p>
      </div>
    `,
    });

    if (!mailSend) {
      error = true;
      errors.push({ code: "mail_error", message: "Something went wrong" });
      return NextResponse.json(
        { payload: null, errors, status: 400, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      payload: user,
      errors: error ? errors : null,
      status: 200,
      success: true,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
}
