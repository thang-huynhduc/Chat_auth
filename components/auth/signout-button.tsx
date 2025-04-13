"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const SignOutButton = () => {
  const handleLogout = async () => {
    signOut({callbackUrl: '/auth/login'});
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  )
}

export default SignOutButton
