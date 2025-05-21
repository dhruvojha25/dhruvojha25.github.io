'use client';

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <AuthProvider>
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-50 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="./" className="text-2xl font-extrabold tracking-tight">
                  KnowledgeBase
                </Link>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-6">
                <Link
                  href="./about"
                  className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  About Us
                </Link>
                <Link
                  href="./login"
                  className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  Login
                </Link>
              </div>
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white focus:outline-none"
                  aria-label="Toggle menu"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="sm:hidden bg-blue-700">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    href="./about"
                    className="block text-white hover:bg-blue-800 px-3 py-2 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="./login"
                    className="block text-white hover:bg-blue-800 px-3 py-2 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">KnowledgeBase</h3>
                <p className="text-sm">Empowering learning and collaboration through knowledge sharing.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="./about" className="text-sm hover:text-white transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="./login" className="text-sm hover:text-white transition">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-sm">Email: support@knowledgebase.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>© {new Date().getFullYear()} KnowledgeBase. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}