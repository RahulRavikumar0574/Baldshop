"use client";
import { useState, useEffect } from "react";

const categoriesFromProducts = (products) => Array.from(new Set(products.map(p => p.category)));

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const categories = categoriesFromProducts(products);

  const filtered = products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category === category;
    const matchesMin = !minPrice || p.price >= parseFloat(minPrice);
    const matchesMax = !maxPrice || p.price <= parseFloat(maxPrice);
    return matchesName && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-app">
      <h1 className="text-2xl font-bold mb-6 text-black">Products</h1>
      <div className="flex flex-wrap gap-4 mb-8 w-full max-w-2xl justify-center bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded px-3 py-2 w-48"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-40"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="border rounded px-3 py-2 w-28"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          min={0}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded px-3 py-2 w-28"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          min={0}
        />
      </div>
      {loading ? (
        <div className="text-gray-500">Loading products...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {filtered.length === 0 && <p className="col-span-full text-gray-500">No products found.</p>}
          {filtered.map(product => (
            <a
              key={product._id || product.id}
              href={`/products/${product._id || product.id}`}
              className="card flex flex-col items-center hover:shadow-xl transition min-h-[340px]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded mb-2 shadow"
              />
              <div className="font-semibold text-lg mb-1 text-black">{product.name}</div>
              <div className="text-sm text-gray-700 mb-1">{product.category}</div>
              <div className="font-bold text-blue-700 mb-2">${product.price?.toFixed(2)}</div>
              <span className="btn mt-auto">View Details</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
} 