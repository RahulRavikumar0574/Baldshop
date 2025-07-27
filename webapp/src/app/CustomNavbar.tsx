"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setLoggedIn(!!localStorage.getItem("loggedInUser"));
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    const handleStorage = () => {
      setLoggedIn(!!localStorage.getItem("loggedInUser"));
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    closeMenu();
    window.location.href = "/login";
  };

  // App-specific links
  const links = [
    { href: "/", label: "Home", icon: "🏠", show: true },
    { href: "/products", label: "Products", icon: "🛒", show: loggedIn },
    { href: "/cart", label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, icon: "🛍️", show: loggedIn },
    { href: "/login", label: "Login", icon: "🔑", show: !loggedIn },
    { href: "/register", label: "Register", icon: "📝", show: !loggedIn },
  ];

  return (
    <>
      <nav className="fixed top-3 lg:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] lg:w-[90vw] max-w-6xl bg-white rounded-xl lg:rounded-2xl shadow-lg px-4 lg:px-12 py-3 lg:py-4 flex items-center justify-between border border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="lg:w-8 lg:h-8 w-6 h-6 rounded-full" />
            <span className="text-lg lg:text-2xl font-bold text-blue-600">BaldShop</span>
          </Link>
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {mounted && links.filter(l => l.show).map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-gray-800 hover:text-blue-500 transition text-base font-medium ${pathname === l.href ? "font-bold text-blue-600" : ""}`}
              onClick={closeMenu}
            >
              {l.label}
            </Link>
          ))}
          {mounted && loggedIn && (
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-blue-500 transition text-base font-medium"
            >
              Logout
            </button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && mounted && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        >
          <div
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-sm bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              {links.filter(l => l.show).map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gray-800 hover:text-yellow-500 transition text-lg font-medium py-2 px-4 rounded-lg hover:bg-yellow-50 flex items-center gap-2"
                  onClick={closeMenu}
                >
                  <span>{l.icon}</span> {l.label}
                </Link>
              ))}
              {loggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-yellow-500 transition text-lg font-medium py-2 px-4 rounded-lg hover:bg-yellow-50 text-left"
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 