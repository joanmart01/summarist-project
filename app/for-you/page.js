import axios from "axios";
import { Suspense } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { BsFillPlayFill } from "react-icons/bs";


async function ForYouPage() {

    async function SelectedBook() {
        const {data} = await axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected");
        const book = data[0];
        return (
            <Link href={`/book/${book.id}`} 
                className="flex justify-between w-2/3 bg-[#fbefd6] h-50 rounded p-6 gap-6">
                <div className="w-2/5">
                    <p>{book.subTitle}</p>
                </div>
                <div className="w-px bg-[#bac8ce]"></div>
                <div className="flex gap-4 w-3/5">
                    <figure className="w-35 h-35">
                        <img src={book.imageLink} className="w-full h-full" />
                    </figure>
                    <div className="flex flex-col">
                        <h6 className="font-semibold mb-2">{book.title}</h6>
                        <p className="mb-4 text-[#394547]">{book.author}</p>

                        <div className="flex items-center gap-2">
                            <BsFillPlayFill className="flex w-10 h-10 min-w-10 bg-black text-white rounded-full p-1" />
                            <p className="font-medium">3 mins 23 secs</p>
                        </div>
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
            <div className="flex flex-col items-start gap-4">
                <h3>{title}</h3>
                <h6 className="font-light text-[#394547]">{subtitle}</h6>
                <div className="flex overflow-auto gap-4">
                    {books.map((book)=> (
                        <Link href={`/book/${book.id}`} 
                              key={book.id} 
                              className="relative flex flex-col items-start px-3 pb-3 pt-8 rounded w-1/5 max-w-50 
                                       hover:bg-[#f1f6f4] transition-colors duration-300 gap-2">
                            {book.subscriptionRequired && 
                            <div className="absolute flex top-0 right-0 h-4.5 w-fit px-2 py-0 items-center 
                                          rounded-[20px] bg-deepblue text-white text-[10px]">
                                Premium
                            </div>}
                            <figure className="w-43 h-43">
                                <img src={book.imageLink} className="w-full h-full"></img>
                            </figure>
                            <h6 className="font-bold">{book.title}</h6>
                            <p className="font-light text-[#6b757b]">{book.author}</p>
                            <p className="text-[#394547]">{book.subTitle}</p>
                            <div className="flex gap-2 text-[#6b757b] font-light">
                                <div className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faClock} />
                                    <p className="">03:24</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faStar} />
                                    <p>{book.averageRating}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="container text-deepblue overflow-hidden">
                <div className="flex flex-col gap-8 w-max-255">
                    <div className="flex flex-col gap-4">
                        <h3>Selected just for you</h3>
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
            </div>
        </div>
    )
}

export default ForYouPage;