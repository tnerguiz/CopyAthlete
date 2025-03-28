import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CopyAthlete - Compare Your Technique With World-Class Athletes",
  description: "Improve your athletic technique by comparing your movements with world-class athletes using advanced video analysis tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">CopyAthlete</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="/features" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="/showcase" className="hover:text-blue-400 transition">Showcase</a></li>
                <li><a href="/pricing" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">CopyAthlete</h3>
                <p className="text-gray-400">Compare your technique with world-class athletes and improve your performance.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                  <li><a href="/features" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="/showcase" className="text-gray-400 hover:text-white transition">Showcase</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                  <li><span className="text-gray-400">support@copyathlete.com</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CopyAthlete. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
