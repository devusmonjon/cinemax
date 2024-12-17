import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Math.random()}-${Date.now().toLocaleString()}-${
      file.name
    }`;

    const filePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);
    return NextResponse.json(
      {
        errors: null,
        payload: `/uploads/${filename}`,
        success: true,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        payload: null,
        errors: [
          {
            code: "server_error",
            message: "Error uploading file",
          },
        ],
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
};
