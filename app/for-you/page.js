import axios from "axios";
import { Suspense } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";


async function ForYouPage() {

    async function SelectedBook() {
        const {data} = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected");
        const book = data[0];
        return (
            <Link href={`/book/${book.id}`} 
                className="flex h-50 bg-amber-300">
                <div>
                    <p>{book.subTitle}</p>
                </div>
                <div className="flex">
                    <figure>
                        <img src={book.imageLink} />
                    </figure>
                    <div className="flex flex-col">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </div>
                </div>
            </Link>
        )
    }

    async function RecommendedBooks(){
        const {data} = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended");
        return (
            <BookRow title="Recommended For You" 
                    subtitle="Suggested Books"
                    books={data}>  
            </BookRow>
        )
    }

    async function SuggestedBooks() {
        const {data} = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested");
        return (
            <BookRow title="Suggested Books" 
                    subtitle="Browse those books"
                    books={data}>  
            </BookRow>
        )
    }

    const BookRow = ({title, subtitle, books}) => {
        return (
            <div>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
                <div className="flex h-50 bg-blue-300">
                    {books.map((book)=> (
                        <Link href={`/book/${book.id}`} 
                              key={book.id} 
                              className="flex flex-col">
                            <figure>
                                <img src={book.imageLink}></img>
                            </figure>
                            <div>
                                <h2>{book.title}</h2>
                                <h4>{book.author}</h4>
                                <p>{book.subTitle}</p>
                                <div>
                                    <div>
                                        <FontAwesomeIcon icon={faClock} />
                                        <h4></h4>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faStar} />
                                        <h4>{book.averageRating}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>This is your dashboard
            <div>
                <h1>Selected just for you</h1>
                <Suspense fallback={<>Loading...</>}>
                    <SelectedBook />
                </Suspense>
            </div>

            <Suspense fallback={<>Loading...</>}>
                <RecommendedBooks />
            </Suspense>

            <Suspense fallback={<>Loading...</>}>
                <SuggestedBooks />
            </Suspense>
        </div>
    )
}

export default ForYouPage;