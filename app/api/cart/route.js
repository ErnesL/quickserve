import connectDB from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function POST(request) {
  const carts = await request.json();
  await connectDB();

  for (const cart of carts) {
    await Cart.create({
      title: cart.title,
      description: cart.description,
      ingredients: cart.ingredients,
      price: cart.price,
      quantity: cart.quantity,
      total: cart.total,
      processed: cart.processed,
      orderId: cart.orderId,
      // table: cart.table,
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
