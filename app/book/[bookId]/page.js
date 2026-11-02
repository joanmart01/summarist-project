import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faClock, faLightbulb, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PlayerData from "../../../components/Player/PlayerData";

async function fetchBookInfo(bookId) {
    const promise = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
    return promise.data;
}

async function BookPage({params}) {
    const {bookId} = await params;
    const bookInfo = await fetchBookInfo(bookId);
    const playerPageData = {
        title: bookInfo.title, 
        summary: bookInfo.summary, 
        author: bookInfo.author,
        thumbnail: bookInfo.imageLink,
        audioLink: bookInfo.audioLink
    }
    return (
        <div>
            <PlayerData audioData={playerPageData} />
            <div>
                <h1>{bookInfo.title}</h1>
                <h2>{bookInfo.author}</h2>
                <h3>{bookInfo.subTitle}</h3>
            </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                        <h4>{`${bookInfo.averageRating} (${bookInfo.totalRating} ratings)`}</h4>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMicrophone} />
                        <h4>{bookInfo.type}</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faClock} />
                        <h4></h4>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faLightbulb} />
                        <h4>{`${bookInfo.keyIdeas} Key ideas`}</h4>
                    </div>
                </div>
            <div>

            </div>

            <div>
                <div>
                    <div>
                        <Link href={`/player/${bookInfo.id}`}>
                            <FontAwesomeIcon icon={faBookOpen} />
                            Read
                        </Link>
                        <Link href={`/player/${bookInfo.id}`}>
                            <FontAwesomeIcon icon={faMicrophone} />
                            Listen
                        </Link>
                    </div>
                    <button>
                        <FontAwesomeIcon icon={faBookmark} />
                        Add title to My Library
                    </button>
                </div>
                <div>
                    <div>
                        <h2>What's it about?</h2>
                        <div>
                            {bookInfo.tags.map((tag, index)=> <button key={index}>{tag}</button>)}
                        </div>
                        <p>{bookInfo.bookDescription}</p>
                    </div>
                    <div>
                        <h2>About the author</h2>
                        <p>{bookInfo.authorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage;