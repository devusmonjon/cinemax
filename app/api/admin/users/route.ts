import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    await connectToDatabase();

    if (!session) {
      return NextResponse.json(
        {
          errors: [
            { code: "unauthenticated", message: "You are not authenticated" },
          ],
          payload: null,
          success: true,
          status: 401,
        },
        { status: 401 }
      );
    }

    // @ts-expect-error: error not defined
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        {
          errors: [
            {
              code: "forbidden",
              message: "You are not allowed to perform this action",
            },
          ],
          payload: null,
          success: true,
          status: 403,
        },
        { status: 403 }
      );
    }

    const users = await User.find({}).select("-password");

    return NextResponse.json(
      { errors: null, payload: users, success: true, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        errors: [{ code: "server_error", message: error }],
        payload: null,
        success: true,
        status: 500,
      },
      { status: 500 }
    );
  }
}
