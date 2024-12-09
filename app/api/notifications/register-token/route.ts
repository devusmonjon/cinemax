import PushNotification from "@/database/push-notification";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
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
          status: 401,
          success: false,
        },
        { status: 401 }
      );
    }
    await connectToDatabase();
    const existToken = await PushNotification.findOne({
      // @ts-expect-error: error not defined
      user_id: session?.user?._id,
    });

    if (existToken) {
      const payload = await PushNotification.findOneAndUpdate(
        {
          // @ts-expect-error: error not defined
          user_id: session?.user?._id,
        },
        {
          fullName: session?.user?.name,
          token: token,
        }
      );
      return NextResponse.json({ errors: null, success: true, payload });
    } else {
      const payload = await PushNotification.create({
        // @ts-expect-error: error not defined
        user_id: session?.user?._id,
        // @ts-expect-error: error not defined
        fullName: session?.user?.fullName,
        allowed: true,
        token: token,
      });
      return NextResponse.json({ errors: null, success: true, payload });
    }
  } catch (error) {
    return NextResponse.json(
      { errors: [{ code: "server_error", message: error }] },
      { status: 400 }
    );
  }
}
