import { NextResponse } from "next/server";

export async function GET() {
    try {
        //const res = await fetch("http://localhost:3000/api/books");
        const res = await fetch("https://summarist-project-gray.vercel.app/api/books");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        const books = data.filter((book) => book.status === "selected");
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