import { NextResponse } from "next/server";
import { getAllBooks } from "../../../../lib/books";

export async function GET(request, {params}) {
    try {
        const {search} = await params;
        //const res = await fetch("http://localhost:3000/api/books");
        //if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        //const data = await res.json();
        const data = await getAllBooks();
        const str = search.toLowerCase();
        const books = data.filter((book) => (
            book.author.toLowerCase().includes(str) 
                || book.title.toLowerCase().includes(str)
        ))
        if (!books) {
            return NextResponse.json(
                { error: `Items with author or title "${search}" not found` },
                { status: 404 }
            );
        }
        return NextResponse.json(books, { status: 200 });

    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 }
        );
    }
}