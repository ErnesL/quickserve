import connectDB from "@/lib/dbConnect";
import Food from "@/models/Food";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDescription: description,
    newIngredients: ingredients,
    newPrice: price,
    newProcessed: processed,
  } = await request.json();
  await connectDB();
  await Food.findByIdAndUpdate(id, {
    title,
    description,
    ingredients,
    price,
    processed,
  });
  return NextResponse.json({ message: "Food updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const food = await Food.findOne({ _id: id });
  return NextResponse.json({ food }, { status: 200 });
}
