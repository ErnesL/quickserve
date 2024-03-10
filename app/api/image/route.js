import { NextResponse } from "next/server";
import {writeFile} from "fs/promises";
import path from "path";

export async function POST(request) {

    const data = await request.formData();
    const image = data.get("file");
    if(!image){
        return NextResponse.json({ message: "No se subió ninguna imagen" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", "menu", image.name);
    console.log(filePath);
    return NextResponse.json({ message: "Imagen subida" , image: image.name}, { status: 201 });
}