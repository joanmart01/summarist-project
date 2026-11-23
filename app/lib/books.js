import axios from "axios";
import { parseStream } from "music-metadata";
import fetch from "node-fetch";
import { formatTime } from "../../components/tools";

export async function addData(api) {
    const {data} = await axios.get(api);
    const array = data.map(async (book) => {
        const response = await fetch(book.audioLink);
        const metadata = await parseStream(response.body, {mimeType: response.headers.get("content-type")});
        const durationSeconds = metadata.format.duration || 0;
        return {...book, 
                duration: durationSeconds, 
                durationFormatted: formatTime(durationSeconds)}
    })
    return await Promise.all(array);
}

export async function getAllBooks() {
    const recommendedBooks = await addData("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended");
    const suggestedBooks = await addData("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested");
    const selectedBooks = await addData("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected");
    const books = [...recommendedBooks, ...suggestedBooks, ...selectedBooks];
    return books;
}