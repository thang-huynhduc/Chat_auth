"use client"

import Image from 'next/image'
import { assets } from "@/assets/assets"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NavBarForm = () => {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

      <div className="flex items-center gap-2">
        <Image
          src={assets.logo}
          alt="Logo"
          className='w-12 h-12 sm:w-16 sm:h-16'
        />
        <span className="text-sm sm:text-base font-semibold">Chatbot</span>
      </div>
      {/* Button with arrow icon */}
      <Button onClick={onClick} className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-900 hover:text-gray-100 bg-gray-500 hover:bg-gray-800 transition-all"> 
        Login
        <Image
          src={assets.arrow_icon}
          alt="->"
          className="w-4 h-4"
        />
      </Button>

    </div>
  )
}

export default NavBarForm
