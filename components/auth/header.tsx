import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <h1
        className={cn(
          "text-4xl sm:text-5xl font-extrabold tracking-tight text-center",
          "bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent",
          font.className
        )}
      >
        AI Chatbot
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg text-center max-w-md">
        {label}
      </p>
    </div>
  )
}
