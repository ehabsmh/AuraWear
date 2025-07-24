import Arrivals from "../_components/customers/Arrivals";
import Deals from "../_components/customers/Deals";
import Hero from "../_components/customers/Hero";
import Support from "../_ui/Support";

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
