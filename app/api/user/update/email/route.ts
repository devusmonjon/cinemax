import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { email } = await req.json();
    const user = await User.findOneAndUpdate(
      {
        // @ts-expect-error: error not defined
        _id: session?.user?._id,
      },
      { email },
      { new: true }
    ).select("-password");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
}
