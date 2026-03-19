import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <Sidebar />
      <Footer />
      <main className="md:ml-[280px] lg:ml-[300px] p-6 md:p-8 pb-20">
        {children}
      </main>
    </div>
  );
}
