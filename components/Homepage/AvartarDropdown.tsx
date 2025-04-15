"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";
import { signOut } from "next-auth/react";

type AvatarDropdownProps = {
  image: string;
  name: string;
};

const AvatarDropdown = ({ image, name }: AvatarDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Xử lý khi nhấp vào avatar
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Xử lý khi nhấp vào Profile
  const handleProfileClick = () => {
    router.push("/private/profile");
    setIsDropdownOpen(false);
  };

  // Xử lý khi nhấp vào Logout
  const handleLogoutClick = async () => {
    logout();
    signOut()
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full border border-black"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;