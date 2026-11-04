import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faClock, faLightbulb, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PlayerData from "../../../components/Player/PlayerData";
import { Suspense } from "react";


async function BookPage({params}) {
    
    async function BookInfo() {
        const {bookId} = await params;
        const {data} = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
        const bookInfo = data;
        
        const playerPageData = {
            title: bookInfo.title, 
            summary: bookInfo.summary, 
            author: bookInfo.author,
            thumbnail: bookInfo.imageLink,
            audioLink: bookInfo.audioLink
        }

        return (
            <div className="flex gap-4 text-deepblue">
                <PlayerData audioData={playerPageData} />

                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-4 mb-4">
                            <h2 className="font-semibold">{bookInfo.title}</h2>
                            <h6 className="font-semibold">{bookInfo.author}</h6>
                            <h4 className="font-light">{bookInfo.subTitle}</h4>
                        </div>

                        <div className="flex flex-col py-4 border-y border-[#e1e7ea] gap-3 mb-6">
                            <div className="flex max-w-100 flex-wrap gap-y-3 font-medium">
                                <div className="flex items-center w-1/2">
                                    <FontAwesomeIcon icon={faStar} />
                                    <p>{`${bookInfo.averageRating} (${bookInfo.totalRating} ratings)`}</p>
                                </div>
                                <div className="flex items-center w-1/2">
                                    <FontAwesomeIcon icon={faMicrophone} />
                                    <p>{bookInfo.type}</p>
                                </div>
                                <div className="flex items-center w-1/2">
                                    <FontAwesomeIcon icon={faClock} />
                                    <p></p>
                                </div>
                                <div className="flex items-center w-1/2">
                                    <FontAwesomeIcon icon={faLightbulb} />
                                    <p>{`${bookInfo.keyIdeas} Key ideas`}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4">
                                <Link href={`/player/${bookInfo.id}`}
                                      className="flex items-center justify-center w-35 h-12 rounded gap-2 
                                                 cursor-pointer bg-deepblue text-white 
                                                 hover:opacity-80 active:translate-y-px transition-opacity duration-300">
                                    <FontAwesomeIcon icon={faBookOpen} />
                                    Read
                                </Link>
                                <Link href={`/player/${bookInfo.id}`}
                                      className="flex items-center justify-center w-35 h-12 rounded gap-2 
                                                 cursor-pointer bg-deepblue text-white
                                                 hover:opacity-80 active:translate-y-px transition-opacity duration-300">
                                    <FontAwesomeIcon icon={faMicrophone} />
                                    Listen
                                </Link>
                            </div>
                            <button className="flex items-center gap-2 font-medium text-[#0365f2] mb-10 
                                             hover:text-[#044298] transition-colors duration-300">
                                <FontAwesomeIcon icon={faBookmark} />
                                <h5>Add title to My Library</h5>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="font-semibold">What's it about?</h5>
                        <div className="flex gap-4">
                            {bookInfo.tags.map((tag, index) => (
                                <button key={index} className="h-12 px-4 bg-[#f1f6f4] rounded font-medium">
                                    {tag}
                                </button>)
                            )}
                        </div>
                        <p>{bookInfo.bookDescription}</p>
                        <h5 className="font-semibold">About the author</h5>
                        <p>{bookInfo.authorDescription}</p>
                    </div> 
                </div>
                    
                <figure className="w-75 h-75 min-w-75">
                    <img src={bookInfo.imageLink} className="w-full h-full" />
                </figure>

            </div>
        )
    }

    return (
        <div className="row">
            <div className="container">
                <Suspense fallback={<>Loading...</>}>
                    <BookInfo />
                </Suspense>
            </div>
        </div>
    );
}

export default BookPage;