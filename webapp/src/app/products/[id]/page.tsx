"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}
function getSafeImageUrl(url: string) {
  if (isExternal(url)) return url;
  if (url.startsWith("/")) return url;
  return "/" + url;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setProduct(null);
        } else {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex flex-col items-center min-h-screen p-4 bg-app">Loading...</div>;
  if (error || !product) return <div className="flex flex-col items-center min-h-screen p-4 bg-app">Product not found.</div>;

  const price = product.price * quantity;
  const discountAmount = price * (discount / 100);
  const taxAmount = (price - discountAmount) * (tax / 100);
  const total = price - discountAmount + taxAmount;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-app">
      <div className="max-w-md w-full border rounded-lg p-6 flex flex-col items-center bg-white shadow">
        {isExternal(product.image) ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover rounded mb-4 shadow"
          />
        ) : (
          <Image
            src={getSafeImageUrl(product.image)}
            alt={product.name}
            width={160}
            height={160}
            className="w-40 h-40 object-cover rounded mb-4 shadow"
          />
        )}
        <h1 className="text-2xl font-bold mb-2 text-black">{product.name}</h1>
        <div className="text-gray-700 mb-2">{product.category}</div>
        <div className="font-bold text-blue-700 mb-4">${product.price.toFixed(2)} per item</div>
        <form className="flex flex-col gap-3 w-full mt-2">
          <label className="flex flex-col">
            Quantity
            <input
              type="number"
              min={1}
              className="border rounded px-3 py-2 mt-1"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </label>
          <label className="flex flex-col">
            Discount (%)
            <input
              type="number"
              min={0}
              max={100}
              className="border rounded px-3 py-2 mt-1"
              value={discount}
              onChange={e => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
            />
          </label>
          <label className="flex flex-col">
            Tax (%)
            <input
              type="number"
              min={0}
              max={100}
              className="border rounded px-3 py-2 mt-1"
              value={tax}
              onChange={e => setTax(Math.max(0, Math.min(100, Number(e.target.value))))}
            />
          </label>
        </form>
        <div className="mt-6 w-full text-center">
          <div className="text-lg font-semibold">Total: <span className="text-blue-700">${total.toFixed(2)}</span></div>
          <div className="text-sm text-gray-500 mt-1">({quantity} × ${product.price.toFixed(2)} - {discount}% + {tax}% tax)</div>
        </div>
        {added && <div className="alert alert-success mt-4">Added to cart!</div>}
        <button
          className="mt-6 btn btn-green w-full"
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const idx = cart.findIndex((item: any) => item._id === product._id && item.discount === discount && item.tax === tax);
            if (idx > -1) {
              cart[idx].quantity += quantity;
            } else {
              cart.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity,
                discount,
                tax
              });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 