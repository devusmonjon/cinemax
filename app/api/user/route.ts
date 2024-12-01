import { NextResponse } from "next/server";

const users = [
  { id: 1, username: "test@example.com", password: "password123" },
];

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return NextResponse.json({ id: user.id, email: user.username });
    } else {
      return NextResponse.json(
        { error: "Email yoki parol noto'g'ri!" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi!" },
      { status: 500 }
    );
  }
}
