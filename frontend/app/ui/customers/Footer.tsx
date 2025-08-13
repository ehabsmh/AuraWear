import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-16 mt-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo-no_bg.png"
            alt="AuraWear Logo"
            width={150}
            height={150}
            className="mb-4"
          />
          <p className="text-gray-400 text-sm text-center">
            AuraWear is your go-to destination for trendsetting fashion that
            blends comfort and elegance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/orders" className="hover:text-white">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h4 className="font-semibold mb-4">Stay in the loop</h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get updates on new arrivals & exclusive deals.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded bg-white text-black text-sm w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-white hover:text-black text-white px-4 py-2 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-6 text-lg text-gray-400">
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaTiktok className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AuraWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
