import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { username, password } = await req.json();

    const isExistingUser = await User.findOne({ username });

    if (!isExistingUser) {
      return NextResponse.json(
        { error: "Username does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, isExistingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, user: isExistingUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
