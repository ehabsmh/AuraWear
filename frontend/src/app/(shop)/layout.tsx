import Footer from "../_ui/customers/Footer";
import Navbar from "../_ui/customers/Navbar";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
