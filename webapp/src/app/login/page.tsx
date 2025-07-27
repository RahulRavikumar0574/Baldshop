"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify({ email: data.email }));
        router.push("/products");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app">
      <div className="max-w-md w-full border rounded-lg p-6 flex flex-col items-center bg-white shadow">
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
} 