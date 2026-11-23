import { NextResponse } from "next/server";
import { getAllBooks } from "../../../lib/books";

export async function GET() {
    try {

        //const res = await fetch("http://localhost:3000/api/books");

        const data = await getAllBooks();

        //if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        //const data = await res.json();
        console.log("fetching suggested books");
        const books = data.filter((book) => book.status === "suggested");
         console.log("suggested books: " + books);
        return NextResponse.json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        console.error('Error fetching featured products:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to fetch featured products' },
            { status: 500 });
    }
}