import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body to get refreshToken
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { code: 400, message: '"refreshToken" is required' },
        { status: 400 }
      );
    }

    // Forward the refreshToken to the external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }), // Include refreshToken in the body
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { code: 500, message: 'Internal server error' },
      { status: 500 }
    );
  }
}