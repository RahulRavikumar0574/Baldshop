import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
} 