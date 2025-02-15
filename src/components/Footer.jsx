"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-blu text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              ExpressWay Builders is your trusted partner in finding the perfect
              property.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 hover:text-white"
                >
                  Properties
                </Link>
              </li>
              <p
              className="mt-2 text-gray-400 cursor-pointer hover:text-white"
              onClick={() => router.push("/termAndCondition")}
            >
              Terms & Conditions
            </p>
            <p
              className="mt-2 text-gray-400 cursor-pointer hover:text-white "
              onClick={() => router.push("/privacyPolicy")}
            >
              Privacy Policy.
            </p>
              
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">
            <span className="text-lg font-semibold"> ExpressWay Builders </span>
            <br />

              sector 142 Noida, Uttar Pradesh
              <br />
              joshi.udham@gmail.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/v/1DA2XfPhFE/"
                className="text-gray-400 hover:text-white"
              >
                <Facebook />
              </a>

              <a
                href="https://www.instagram.com/expressway_builders?igsh=MXMzOHcyejhsMG95aA=="
                className="text-gray-400 hover:text-white"
              >
                <Instagram />
              </a>

            </div>
            
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 CMT AI All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
