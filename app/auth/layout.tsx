import { cn } from '@/lib/utils'
import React from 'react'

const AuthLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center",
        "bg-gradient-to-tr from-slate-700 via-indigo-800 to-indigo-600",
        "px-4 py-12"
      )}
    >
      <div className={cn(
        "w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl",
        "p-6 border border-white/20"
      )}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
