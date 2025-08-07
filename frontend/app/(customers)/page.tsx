import Arrivals from "../components/customers/home/Arrivals";
import Deals from "../components/customers/home/Deals";
import Hero from "../components/customers/home/Hero";
import Support from "../ui/customers/Support";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="container w-4/5 mx-auto">
        <Support />
        <Arrivals />
        <Deals />
      </div>
    </>
  );
}
