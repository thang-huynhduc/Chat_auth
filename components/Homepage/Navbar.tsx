// components/NavBarForm.tsx
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import AvatarDropdown from "@/components/Homepage/AvartarDropdown"; // Client component cho dropdown
import { Session } from "next-auth";

const NavBarForm = async ({ session } : { session: Session | null}) => {
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <div className="flex items-center gap-2">
        <Image
          src={assets.logo}
          alt="Logo"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
        <span className="text-sm sm:text-base font-semibold">Chatbot</span>
      </div>

      {session ? (
        // Khi đã đăng nhập, hiển thị avatar qua client component
        <div className="flex flow-row justify-center items-center">
          <AvatarDropdown
          image={assets.logo}
          name={session.user.username || "User"}
        /> 
        {session.user.username}
        </div>
      ) : (
        // Khi chưa đăng nhập, hiển thị nút Login
        <Button
          asChild
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-900 hover:text-gray-100 bg-gray-500 hover:bg-gray-800 transition-all"
        >
          <a href="/auth/login">
            Login
            <Image src={assets.arrow_icon} alt="->" className="w-4 h-4" />
          </a>
        </Button>
      )}
    </div>
  );
};

export default NavBarForm;
