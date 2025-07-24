"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory, BiHome } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import { PiTShirt } from "react-icons/pi";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="text-inactive bg-primary shadow-[0_20px_10px_rgba(0,0,0,0.2)] flex flex-col justify-between">
      <ul className="space-y-8 mt-4 ml-8">
        <li className="mb-10">
          <Link replace href="/admin/dashboard">
            <Image
              quality={100}
              src="/logo.png"
              height="150"
              width="150"
              alt="Aura Wear logo"
            />
          </Link>
        </li>
        <li>
          <Link
            replace
            href="/admin/dashboard"
            className={`${
              pathname === "/admin/dashboard" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <BiHome
              className={`${
                pathname === "/admin/dashboard"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem]`}
            />
            <span className="">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className={`${
              pathname === "/admin/products" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <PiTShirt
              className={`${
                pathname === "/admin/products"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem] `}
            />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className={`${
              pathname === "/admin/categories" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <BiCategory
              className={`${
                pathname === "/admin/categories"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem] `}
            />
            <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/subcategories"
            className={`${
              pathname === "/admin/subcategories" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <MdCategory
              className={`${
                pathname === "/admin/subcategories"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem] `}
            />
            <span>Subcategories</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orders"
            className={`${
              pathname === "/admin/orders" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <BsBag
              className={`${
                pathname === "/admin/orders"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem] `}
            />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/settings"
            className={`${
              pathname === "/admin/settings" ? "text-secondary" : ""
            } flex items-center gap-3 hover:ml-3 duration-100`}
          >
            <CiSettings
              className={`${
                pathname === "/admin/settings"
                  ? "text-secondary"
                  : "text-inactive"
              } text-[1.3rem] `}
            />
            <span>Settings</span>
          </Link>
        </li>
      </ul>

      <div className="border border-gray-300">
        <p>Ehab Elsayed</p>
      </div>
    </nav>
  );
}

export default Navbar;
