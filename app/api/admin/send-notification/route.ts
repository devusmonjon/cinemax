import PushNotification from "@/database/push-notification";
import { connectToDatabase } from "@/lib/mongoose";
import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // eslint-disable-next-line no-use-before-define
  const serviceAccount = require("@/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
      imageUrl:
        "https://staticg.sportskeeda.com/editor/2022/12/0c291-16709643615161-1920.jpg",
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await connectToDatabase();

    const users = await PushNotification.find();

    const response = await admin.messaging().sendEachForMulticast({
      tokens: users.map((user) => user.token),
      notification: payload.notification,
      webpush: payload.webpush,
    });

    if (response.failureCount > 0) {
      const failedTokens = response.responses.filter((res) => !res.success);
      return NextResponse.json({ success: false, failedTokens });
    }

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
