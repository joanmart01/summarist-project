"use client"
import { useRouter } from 'next/navigation';
import { faMagnifyingGlass, faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState, useContext } from "react";
import { LayoutContext } from '@/app/layout';


function SearchBar() {

    const dormant_state = 0;
    const loading_state = 1;
    const negative_state = 2;
    const results_state = 3;

    const [typing, setTyping] = useState(false);
    const [searchState, setSearchState] = useState(dormant_state);
    const [searchArray, setSearchArray] = useState();
    const {showDashModal} = useContext(LayoutContext);
    const router = useRouter();
    const textRef = useRef(null);

    function clearTextField() {
        if(textRef.current) textRef.current.value = "";
        resetData();
    }

    function resetData() {
        setTyping(false);
        setSearchArray(null);
        setSearchState(dormant_state);
    }

    function switchButton(event) {
        if(event.key.length==1) setTyping(true);
    }

    function goToBookPage(bookId){
        clearTextField();
        router.push(`/book/${bookId}`);
    }

    async function searchBook(search) {
        if(search.length==0) {
            resetData();
            return;
        }
        setSearchState(loading_state);
        try {
            const res = await fetch(`http://localhost:3000/api/books/search/${search}`);
            const data = await res.json();
            const books = data || [];
            setSearchArray(books);
            setTimeout(() => {
                setSearchState(books.length>0 ? results_state : negative_state); 
            }, 1000);
            
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="sticky flex justify-center border-b border-[#e1e7ea] z-10
                        w-screen md:w-[calc(100vw-200px)]">
            <div className="flex items-center justify-end gap-6 w-full h-20 px-8 bg-white">
                <div className="flex items-center w-full max-w-85 gap-2 bg-[#f1f6f4]
                                border-2 border-[#e1e7ea] rounded-lg">
                    <input type="text"
                        ref={textRef} 
                        placeholder="Search for books"
                        onChange={(e) => searchBook(e.target.value)}
                        onKeyDown={(e) => switchButton(e)}
                        className="text-[#042330] h-10 w-full px-4 py-0 outline-none"/>
                    <button className="flex items-center justify-center px-2 h-full border-l-2 border-solid border-[#e1e7ea] text-deepblue"
                            onClick={clearTextField}>
                        <figure className="w-6 h-6 p-0">
                            {typing ? <FontAwesomeIcon icon={faX} />
                                    : <FontAwesomeIcon icon={faMagnifyingGlass} />} 
                        </figure> 
                    </button>
                </div>

                <button className="md:hidden"
                        onClick={() => showDashModal(true)}>
                    <FontAwesomeIcon className='fa-lg' icon={faBars} />                    
                </button>
            </div>
            

            {searchState != dormant_state && 
            <div className="absolute flex flex-col overflow-auto p-4
                            gap-1 w-110 max-w-110 max-h-160 top-18 right-8 
                            border border-[#e1e7ea] rounded shadow-md bg-white">

                {searchState==loading_state? 
                    new Array(5).fill(0).map((_, index) => {
                        return (
                            <div key={index} className="w-full h-30 bg-gray-300"></div>
                        )
                    })
                :
                    searchState==negative_state?
                    <p>No books found</p>
                    :
                    searchArray.map((book, index) => (
                        <div key={index}
                              onClick={()=> goToBookPage(book.id)} 
                              className="flex items-center py-4 pl-4 gap-6 w-full h-30 border-b border-[#e1e7ea]
                                         cursor-pointer hover:bg-[#f1f6f4] transition-colors duration-300">
                            <figure className="w-20 h-20 w-min-20">
                                <img className="w-full" src={book.imageLink} />
                            </figure>
                            <div className="flex flex-col gap-2 w-70">
                                <h6 className="text-deepblue font-medium">{book.title}</h6>
                                <p className="text-[#6b757b] font-light">{book.author}</p>
                                <div className="flex items-center gap-1 text-[#6b757b] font-light">
                                    <FontAwesomeIcon icon={faClock} />
                                    <p className="">{book.durationFormatted}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}

export default SearchBar;