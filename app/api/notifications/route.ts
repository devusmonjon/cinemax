import Notification from "@/database/notification.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || 10; // Agar aniqlanmagan bo'lsa, 10 deb belgilash
    console.log(limit);

    await connectToDatabase();

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

    const notifications = await Notification.find({
      // @ts-expect-error: error not defined
      user_id: session?.user?._id,
    }).limit(Number(limit));

    if (!notifications) {
      return NextResponse.json(
        {
          errors: [
            {
              code: "notifications_not_found",
              message: "Notifications not found",
            },
          ],
          payload: null,
          success: false,
          status: 400,
        },
        { status: 400 }
      );
    }

    const notificationsLength = await Notification.countDocuments({
      // @ts-expect-error: error not defined
      user_id: session?.user?._id,
    });

    return NextResponse.json({
      errors: [],
      payload: notifications,

      limit: limit,
      total: notificationsLength,
      success: true,
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        errors: [
          {
            code: "server_error",
            message: err,
          },
        ],
        payload: null,
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
}
