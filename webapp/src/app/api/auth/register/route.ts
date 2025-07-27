import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const hash = await bcrypt.hash(password, 10);
  await db.collection("users").insertOne({ email, password: hash });
  return NextResponse.json({ success: true });
} 