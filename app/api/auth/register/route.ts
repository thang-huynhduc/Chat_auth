import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/sign-up`, 
      { username, email, password }
    );

    // Trả về dữ liệu client
    return NextResponse.json(response.data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Register error:", error);
    const message =
      error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký";
    const status = error.response?.status || 500;

    return NextResponse.json({ message }, { status });
  }
}
