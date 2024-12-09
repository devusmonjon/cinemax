import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqTDypMMLAn8tB10BnIl56ebCAcWW6jo",
  authDomain: "test-project-687e9.firebaseapp.com",
  projectId: "test-project-687e9",
  storageBucket: "test-project-687e9.firebasestorage.app",
  messagingSenderId: "961091807826",
  appId: "1:961091807826:web:483646db89afeeecae4d8b",
  measurementId: "G-9G4FQRST70",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
