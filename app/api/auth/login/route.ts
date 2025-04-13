import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth"; // đảm bảo là bản NextAuth từ server-side

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Không redirect
    });

    // Nếu không có lỗi thì đăng nhập thành công
    return NextResponse.json({ success: true, message: "Đăng nhập thành công", result });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Login failed",
      },
      { status: 401 }
    );
  }
}
