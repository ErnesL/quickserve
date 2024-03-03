import connectDB from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function POST(request) {
  const foods = await request.json();
  await connectDB();

  for (const food of foods) {
    await Cart.create({
      title: food.title,
      description: food.description,
      ingredients: food.ingredients,
      price: food.price,
      quantity: food.quantity,
      total: food.total,
      processed: food.processed,
    });
  }
  return NextResponse.json(
    { message: "Cart successfully written to MongoDB cart collection" },
    { status: 201 }
  );
}

export async function GET() {
  await connectDB();
  const cart = await Cart.find({ processed: false }).sort({ createdAt: 1 });
  return NextResponse.json({ cart });
}
