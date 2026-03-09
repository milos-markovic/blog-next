import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto p-5 flex-1 text-left w-full">{children}</main>

      <Footer />
    </>
  );
}
