"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(!!localStorage.getItem("loggedInUser"));
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    }
    const handleStorage = () => {
      setLoggedIn(!!localStorage.getItem("loggedInUser"));
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    window.location.href = "/login";
  };

  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-center gap-6 py-4 border-b mb-8 bg-white shadow-sm z-10">
      <a href="/" className={`hover:underline ${pathname === "/" ? "font-bold text-blue-700" : ""}`}>Home</a>
      {!loggedIn && <a href="/login" className={`hover:underline ${pathname === "/login" ? "font-bold text-blue-700" : ""}`}>Login</a>}
      {!loggedIn && <a href="/register" className={`hover:underline ${pathname === "/register" ? "font-bold text-blue-700" : ""}`}>Register</a>}
      {loggedIn && <a href="/products" className={`hover:underline ${pathname.startsWith("/products") ? "font-bold text-blue-700" : ""}`}>Products</a>}
      {loggedIn && (
        <a href="/cart" className={`hover:underline relative ${pathname === "/cart" ? "font-bold text-blue-700" : ""}`}>
          Cart
          {cartCount > 0 && (
            <span className="ml-1 bg-blue-600 text-white rounded-full px-2 text-xs align-top">{cartCount}</span>
          )}
        </a>
      )}
      {loggedIn && <button onClick={handleLogout} className="hover:underline bg-transparent border-none cursor-pointer">Logout</button>}
    </nav>
  );
} 