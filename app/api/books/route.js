import {getAllBooks} from "../../lib/books";

export async function GET() {
    try{
        return Response.json(await getAllBooks());
    } catch(e) {
        console.error(e);
        return [];
    }    
}