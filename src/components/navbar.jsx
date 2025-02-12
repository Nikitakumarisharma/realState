"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase_config";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-blu shadow-md px-8 flex justify-between items-center fixed top-0 w-full z-50">
      {/* Left - Logo */}
      <div className=" font-bold text-white">
  <Link href="/">
    <Image
      src="/assets/logo.png" // Path to your logo inside the public folder
      alt="ExpressWay Logo"
      height={50} // Adjust height as needed
      width={100} // Adjust width as needed
      layout="intrinsic" // Ensures aspect ratio is maintained

      priority // Ensures logo loads faster
    />
  </Link>
</div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-white bg-blu focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Right - Navigation Links */}
      <div
        className={`lg:flex ${
          menuOpen ? "block" : "hidden"
        } absolute lg:static top-16 left-0 w-full lg:w-auto  lg:bg-transparent z-40 lg:flex-row flex-col text-center py-6 lg:py-0 transition-all duration-300 ease-in-out opacity-90 bg-blu`}
      >
        <div className="lg:flex lg:space-x-6 flex flex-col lg:flex-row items-center">
          <Link
            href="/"
            className="text-white hover:text-gray-300 py-2 block lg:inline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 py-2 block lg:inline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/properties"
            className="text-white hover:text-gray-300 py-2 block lg:inline"
            onClick={() => setMenuOpen(false)}
          >
            Properties
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-gray-300 py-2 block lg:inline"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Show Login or Logout based on Authentication */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400 hover:text-red-500 py-2 block lg:inline"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-gray-300 hover:text-black py-2 block lg:inline"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
