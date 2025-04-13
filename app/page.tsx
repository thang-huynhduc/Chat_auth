import HeaderHome from "@/components/Homepage/Header";
import NavBarForm from "@/components/Homepage/Navbar";

export default function Home() {
  return (
    <main style={{ backgroundImage: "url('/bg_img.png')" }} className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
      <NavBarForm />
      <HeaderHome />
    </main>
  );
}
