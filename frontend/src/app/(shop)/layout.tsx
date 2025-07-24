import Footer from "../_ui/customers/Footer";
import Navbar from "../_ui/customers/Navbar";
// import Footer from "../_ui/customers/Footer";

export default function ShopLayout({
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
