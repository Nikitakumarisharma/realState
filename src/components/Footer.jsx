'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
    const router = useRouter();
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">RealEstate Co. is your trusted partner in finding the perfect property.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              123 Real Estate Street
              <br />
              Cityville, State 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@realestateco.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin />
              </a>
            </div>
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
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 RealEstate Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

