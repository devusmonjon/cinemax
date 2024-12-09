import Notification from "@/database/notification.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user_id, message, image, url, title } = await req.json();

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

    // @ts-expect-error: error not defined
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        errors: [
          {
            code: "forbidden",
            message: "You are not allowed to perform this action",
          },
        ],
        payload: null,
        status: 403,
        success: false,
      });
    }

    const notification = await Notification.create({
      user_id,
      title,
      message,
      image,
      url,
    });

    return NextResponse.json(
      {
        errors: [],
        payload: notification,
        status: 200,
        success: true,
      },
      { status: 200 }
    );
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
        success: false,
      },
      { status: 500 }
    );
  }
}
