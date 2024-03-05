import connectDB from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDescription: description,
    newIngredients: ingredients,
    newPrice: price,
    newQuantity: quantity,
    newTotal: total,
    newProcessed: processed,
    newType: type,
    newClientComments: clientComments,
  } = await request.json();
  await connectDB();
  await Cart.findByIdAndUpdate(id, {
    title,
    description,
    ingredients,
    price,
    quantity,
    total,
    processed,
    type,
    clientComments,
  });
  return NextResponse.json(
    { message: "Food in Cart updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const cart = await Cart.findOne({ _id: id });
  return NextResponse.json({ cart }, { status: 200 });
}
