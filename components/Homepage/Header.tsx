import { assets } from "@/assets/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

// Nhận session từ props thay vì gọi auth()
const HeaderHome = ({ session }: { session: Session | null }) => {
  const displayName = session?.user?.username || "Devoloper";
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center">
      <Image
        src={assets.header_img}
        alt="Hello"
        className="w-64 h-64 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {displayName}
        <Image
          src={assets.hand_wave}
          alt="Hand waving"
          className="w-8 aspect-square"
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to My Chatbot!!!
      </h2>
      <p className="mb-8 text-3xl">
        Thần dân, chuẩn bị nghênh đón Chatbot đỉnh cao của ta! 👑
      </p>
      <Button className="w-[200px] h-[50px] border border-gray-900 rounded-full px-8 py-2.5 text-gray-100 hover:text-gray-800 bg-gray-500 hover:bg-gray-200 transition-all">
        Getting Started
        <Image src={assets.arrow_icon} alt="->" className="w-4 h-4" />
      </Button>
      <div className="text-lg sm:text-xl text-gray-700 font-medium italic max-w-xl mx-auto mb-6 mt-8">
        Build smarter.{" "}
        <span className="text-indigo-600 font-semibold">Chat faster.</span>{" "}
        <span className="text-emerald-600 font-semibold">Code like a legend.</span>
      </div>
    </div>
  );
};

export default HeaderHome;