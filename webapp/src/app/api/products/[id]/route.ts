import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();
  try {
    const product = await db.collection("products").findOne({ _id: new ObjectId(params.id) });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
} 