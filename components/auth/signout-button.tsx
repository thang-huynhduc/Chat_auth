'use client';
import { logout } from '@/lib/api';

export default function SignOutButton() {
  return (
    <button
      onClick={() => logout()}
      style={{ padding: '8px 16px', marginTop: '16px' }}
    >
      Sign Out
    </button>
  );
}