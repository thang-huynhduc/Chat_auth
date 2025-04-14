'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Component to display the error (wrapped in Suspense)
function ErrorDisplay() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Unknown error';

  return (
    <div>
      <h1>Lỗi xác thực</h1>
      <p>{error}</p>
      <a href="/login">Quay lại đăng nhập</a>
    </div>
  );
}

// Main page component
export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <ErrorDisplay />
    </Suspense>
  );
}

// Mark the page as dynamic to avoid prerendering
export const dynamic = 'force-dynamic';