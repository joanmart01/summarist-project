"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

function DashboardSearchBar() {

    const dormant_state = 0;
    const loading_state = 1;
    const negative_state = 2;
    const results_state = 3;

    const [typing, setTyping] = useState(false);
    const [searchState, setSearchState] = useState(dormant_state);
    const [searchArray, setSearchArray] = useState();

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
            const {data} = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`);
            setSearchArray(data);
            setTimeout(() => {
                setSearchState(data.length>0 ? results_state : negative_state); 
            }, 1000);
            
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="relative flex items-center justify-end px-8 bg-white 
                        border-b-1 border-[#e1e7ea] border-solid h-20 w-full">
            <div className="flex items-center w-full max-w-85 gap-2 bg-[#f1f6f4]
                            border-2 border-solid border-[#e1e7ea] rounded-lg">
                <input type="text"
                       ref={textRef} 
                       placeholder="Search for books"
                       onChange={(e) => searchBook(e.target.value)}
                       onKeyDown={(e) => switchButton(e)}
                    //    onBlur={resetData}
                       className="text-[#042330] h-10 w-full px-4 py-0 outline-none"/>
                <button className="flex items-center justify-center px-2 h-full border-l-2 border-solid border-[#e1e7ea] text-[#032b41]"
                        onClick={clearTextField}>
                    <figure className="w-6 h-6 p-0">
                        {typing ? <FontAwesomeIcon icon={faX} />
                                : <FontAwesomeIcon icon={faMagnifyingGlass} />} 
                    </figure> 
                </button>
            </div>

            {searchState != dormant_state && 
            <div className="absolute flex flex-col overflow-auto 
                            gap-1 w-[75%] max-w-100 max-h-160 top-18 right-8 
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
                    searchArray.map((book, index)=>{
                        return (
                        <div key={index}
                              onClick={()=> goToBookPage(book.id)} 
                              className="flex items-center p-4 gap-6 w-full h-30 border-b-[#e1e7ea] cursor-pointer">
                            <figure className="w-20">
                                <img className="w-full h-full" src={book.imageLink} />
                            </figure>
                            <div className="">
                                <h3 className="text-[#032b41]">{book.title}</h3>
                                <h6 className="text-[#6b757b]">{book.author}</h6>
                                <h6 className="text-[#6b757b]">duration??</h6>
                            </div>
                        </div>
                        )
                    })
                }






            </div>}

        </div>
    )
}

export default DashboardSearchBar;