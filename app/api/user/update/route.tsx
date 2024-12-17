import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          errors: [
            {
              code: "unauthenticated",
              message: "You are not authenticated",
            },
          ],
          payload: null,
          success: true,
          status: 401,
        },
        { status: 401 }
      );
    }

    const { photo } = await req.json();
    const user = await User.findOneAndUpdate(
      {
        // @ts-expect-error: error not defined
        _id: session?.user?._id,
      },
      { image: photo },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          errors: [{ code: "user_not_found", message: "User not found" }],
          payload: null,
          success: true,
          status: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
