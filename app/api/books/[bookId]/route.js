import { NextResponse } from "next/server";
import { getAllBooks } from "../../../lib/books";

export async function GET(request, {params}) {
    try {

        const {bookId} = await params;
        //const res = await fetch("http://localhost:3000/api/books");
        //if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        //const data = await res.json();
        const data = await getAllBooks();
        const book = data.find((i) => String(i.id) === String(bookId));
        if (!book) {
            return NextResponse.json(
                { error: `Item with ID ${bookId} not found` },
                { status: 404 }
            );
        }
        return NextResponse.json(book, { status: 200 });

    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 }
        );
    }
}