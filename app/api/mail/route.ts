import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const mail = await transporter.sendMail({
      from: process.env.MAIL_USER!,
      to: email!,
      subject: "Welcome to CineMax!",
      html: `
            <div style="text-align: center;">
              <h1 style="color: #333;">Welcome to CineMax!</h1>
              <p style="font-size: 18px;">Hi ${email},</p>
              <p style="font-size: 18px;">Welcome to CineMax! We're excited to have you join our community.</p>
              <p style="font-size: 18px;">Your username: ${email}</p>
              <p style="font-size: 18px;">Your password: ${email}</p>
              <p style="font-size: 18px;">Please log in to your account to start exploring our platform.</p>
              <p style="font-size: 18px;">Best regards,<br>The CineMax Team</p>
            </div>
          `,
    });
    return NextResponse.json({ mail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
