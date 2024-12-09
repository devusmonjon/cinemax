import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7HzGO6nrMI3DUPe_cZDXCl9eFZJnl8fI",
  authDomain: "cine-max-test.firebaseapp.com",
  projectId: "cine-max-test",
  storageBucket: "cine-max-test.firebasestorage.app",
  messagingSenderId: "530144009723",
  appId: "1:530144009723:web:4e1826791a9576a61fbf5e",
  measurementId: "G-JBVLYLCSDN",
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
