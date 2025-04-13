"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BackButtonProps {
  href: string
  label: string
}

export const BackButton = ({
  href,
  label
}: BackButtonProps) => {
  return (
    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
      <Link
        href={href}
        className="flex flex-row items-center transition underline-offset-2 hover:text-teal-500"
      >
        {label}
        <ArrowRight className="w-4 h-4 " />
      </Link>
    </div>
  )
}
