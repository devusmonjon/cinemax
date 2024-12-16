import PushNotification from "@/database/push-notification";
import { connectToDatabase } from "@/lib/mongoose";
import admin, { ServiceAccount } from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Firebase Admin SDK-ni boshlash
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT!
  ) as ServiceAccount;
  console.log(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { title, message, link } = await request.json();

  const payload: Message = {
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
  } as Message;

  try {
    // MongoDBga ulanish
    await connectToDatabase();

    // Bazadan barcha foydalanuvchilarni olish
    const users = await PushNotification.find();

    // Tokenlar orqali xabar yuborish
    const response = await admin.messaging().sendEachForMulticast({
      tokens: users.map((user) => user.token), // Tokenlar ro‘yxati
      notification: payload.notification, // Xabar ma'lumotlari
      webpush: payload.webpush, // WebPush parametrlari
    });

    // Yuborish natijalarini tekshirish
    if (response.failureCount > 0) {
      const failedTokens = response.responses
        .map((res, idx) =>
          !res.success ? { token: users[idx].token, error: res.error } : null
        )
        .filter(Boolean); // Xatolik bo‘lgan tokenlarni olish
      return NextResponse.json({ success: false, failedTokens });
    }

    // Muvaffaqiyatli xabar yuborish
    return NextResponse.json({
      success: true,
      message: "Notification sent!",
      payload: response,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
