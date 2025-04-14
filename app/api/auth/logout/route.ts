import { NextResponse } from 'next/server';

export async function POST() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  console.log("Logout thanhf coong")
  return NextResponse.json(data, { status: response.status });
}