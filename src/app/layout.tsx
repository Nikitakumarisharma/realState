import "./globals.css";
import Footer from "@/components/Footer"; // Use alias for consistency
import Navbar from "@/components/navbar";
// import Carousel from "@/components/Carousel";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
