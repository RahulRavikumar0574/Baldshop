"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [changed, setChanged] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("loggedInUser")) {
      router.replace("/login");
      return;
    }
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [router, changed]);

  const updateItem = (idx: number, field: string, value: number) => {
    const newCart = [...cart];
    newCart[idx][field] = value;
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeItem = (idx: number) => {
    const newCart = cart.filter((_, i) => i !== idx);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    setSuccess("Item removed from cart.");
    setTimeout(() => setSuccess(""), 1500);
  };

  const getItemTotal = (item: any) => {
    const price = item.price * item.quantity;
    const discountAmount = price * (item.discount / 100);
    const taxAmount = (price - discountAmount) * (item.tax / 100);
    return price - discountAmount + taxAmount;
  };

  const overallTotal = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-app">
      <h1 className="text-2xl font-bold mb-6 text-black">Your Cart</h1>
      {success && <div className="alert alert-success">{success}</div>}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded shadow p-4">
          <table className="w-full border mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Discount (%)</th>
                <th className="p-2">Tax (%)</th>
                <th className="p-2">Total</th>
                <th className="p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded shadow" />
                    <div>
                      <div className="font-semibold text-black">{item.name}</div>
                      <div className="text-xs text-gray-700">{item.category}</div>
                      <div className="text-xs text-gray-700">${item.price.toFixed(2)} each</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={1}
                      className="border rounded px-2 py-1 w-16"
                      value={item.quantity}
                      onChange={e => updateItem(idx, "quantity", Math.max(1, Number(e.target.value)))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="border rounded px-2 py-1 w-16"
                      value={item.discount}
                      onChange={e => updateItem(idx, "discount", Math.max(0, Math.min(100, Number(e.target.value))))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="border rounded px-2 py-1 w-16"
                      value={item.tax}
                      onChange={e => updateItem(idx, "tax", Math.max(0, Math.min(100, Number(e.target.value))))}
                    />
                  </td>
                  <td className="p-2 font-semibold text-blue-700">${getItemTotal(item).toFixed(2)}</td>
                  <td className="p-2">
                    <button
                      className="btn btn-red"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-lg font-bold mt-4">
            Cart Total: <span className="text-blue-700">${overallTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
} 