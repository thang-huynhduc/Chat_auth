import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = request.headers.get('authorization')?.split(' ')[1];
  if (!accessToken) {
    return NextResponse.json({ success: false, error: 'No access token' }, { status: 401 });
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/updateInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}