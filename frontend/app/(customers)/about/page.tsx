import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Normally you'd fetch this from a DB or CMS (server-side safe)
const team = [
  { name: "Ehab Elsayed", role: "Founder & Engineer", img: "/1.webp" },
  { name: "Sarah Ahmed", role: "Designer", img: "/8.jpg" },
  { name: "Omar Khaled", role: "Marketing", img: "/7.jpg" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About AuraWear</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At AuraWear, we blend fashion with technology to create a modern
          shopping experience. Our mission is to make stylish clothing
          accessible and enjoyable for everyone.
        </p>
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Founded in 2025 in Cairo, AuraWear started with the idea of
            combining simple design with digital innovation. From small
            beginnings, we’ve grown into a platform that connects customers with
            high-quality fashion products.
          </p>
        </div>
        <Image
          src="/logo.png"
          alt="Our story"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card
              key={member.name}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
