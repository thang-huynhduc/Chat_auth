"use client"

// import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes"


export const Social = () => {
  // const onClick = (provider: "google" | "github") => {

  // }
  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-3">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-xs uppercase text-muted-foreground bg-background px-2">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <div className="flex gap-4">
        <Button
          size="lg"
          className="flex-1 bg-white text-black hover:bg-gray-200"
          variant="outline"
          // onClick={() => onClick("google")}
        >
          <FcGoogle className="h-5 w-5" />
          Google
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-white text-black hover:bg-gray-200"
          variant="outline"
          // onClick={() => onClick("github")}
        >
          <FaGithub className="h-5 w-5" />
            Github
        </Button>
      </div>
    </div>
  )
}

