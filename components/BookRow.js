"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { LayoutContext } from "../app/layout";


const BookRow = ({title, subtitle, books}) => {
    const {user} = useContext(LayoutContext);
    return (
        <div className="flex flex-col items-start gap-4">
            <h3>{title}</h3>
            <h6 className="font-light text-[#394547]">{subtitle}</h6>
            <div className="flex gap-4 w-[calc(100vw-48px)] md:w-[calc(100vw-248px)] overflow-x-auto scrollbar-none">
                {books?
                books.length>0 &&
                books.map((book)=> (
                    <div key={book.id} 
                         className={`relative flex flex-col items-start px-3 pb-3 pt-8 rounded w-49 max-w-50 gap-2
                                     ${(!user.accessLevel<2) && book.subscriptionRequired? 
                                        "cursor-not-allowed"
                                        : "hover:bg-[#f1f6f4] transition-colors duration-300"
                                     }`}>
                        <Link href={`/book/${book.id}`} 
                              className={`${(!user.accessLevel<2) && book.subscriptionRequired && "pointer-events-none"}`}>
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
                                    <p className="">{book.durationFormatted}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faStar} />
                                    <p>{book.averageRating}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
                :
                <>Loading...</>
                }
            </div>
        </div>
    )
}

export default BookRow;