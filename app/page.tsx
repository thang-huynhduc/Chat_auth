import HeaderHome from "@/components/Homepage/Header";
import NavBarForm from "@/components/Homepage/Navbar";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/bg_img.png')" }}></div>
      <NavBarForm />
      <HeaderHome />
    </main>
  );
}
