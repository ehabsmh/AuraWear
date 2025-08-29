import Footer from "../ui/customers/Footer";
import Navbar from "../ui/customers/Navbar";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 mt-[96px]">{children}</main>
      <Footer />
    </div>
  );
}
