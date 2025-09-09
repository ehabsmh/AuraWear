import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Get in Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" type="email" />
            <textarea placeholder="Your Message" rows={5} />
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-secondary" />
              <span>support@aurawear.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-secondary" />
              <span>+20 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-secondary" />
              <span>Cairo, Egypt</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!..."
              className="w-full h-48 rounded-lg border"
              loading="lazy"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
