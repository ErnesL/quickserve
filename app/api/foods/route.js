import connectDB from "@/lib/dbConnect";
import Food from "@/models/Food";
import { NextResponse } from "next/server";


export async function POST(request) {
  const { title, type, description, total,rating, quantity, ingredients, price, processed, strImage } =
    await request.json();
  await connectDB();
  await Food.create({
    title,
    description,
    ingredients,
    price,
    quantity,
    total,
    processed,
    type,
    rating,
    strImage,
  });
  return NextResponse.json({ message: "Food created" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const foods = await Food.find();
  return NextResponse.json({ foods });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Food.findByIdAndDelete(id);
  return NextResponse.json({ message: "Food deleted" }, { status: 200 });
}
