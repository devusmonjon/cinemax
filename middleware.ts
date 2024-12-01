import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Foydalanuvchi kelayotgan "origin"ni olish
  const origin = req.headers.get("origin");

  // CORS uchun ruxsat berilgan domenlar
  const allowedOrigins = [
    "http://localhost:3000", // Local dev uchun
    "https://your-production-site.com", // Prod domeningiz
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    res.headers.set("Access-Control-Allow-Origin", "*");
  }

  // CORS sarlavhalarini qo‘shish
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Agar so‘rov OPTIONS bo‘lsa, javob qaytaring (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: res.headers,
      status: 204,
    });
  }

  return res;
}

// Middleware qaysi yo‘nalishlarda ishlashini aniqlash
export const config = {
  matcher: "/api/:path*", // Faqat `/api` route'lar uchun
};
