import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-app">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center mt-8">
        
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to BaldShop!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover amazing products, calculate your savings, and enjoy a seamless shopping experience.
        </p>
        <Link href="/products" className="btn text-lg px-8 py-3">Browse Products</Link>
      </div>
    </main>
  );
}
