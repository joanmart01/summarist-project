"use client"
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../layout";
import BookRow from "../../components/BookRow";
import SkeletonRow from "../../components/Loading/SkeletonRow";
import LoginPrompt from "../../components/LoginPrompt";
import { getDocs } from "firebase/firestore";


function Page() {
    const [savedBooks, setSavedBooks] = useState([]);
    const [finishedBooks, setFinishedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(LayoutContext);
    const savedTitle = "Saved Books";
    const finishedTitle = "Finished Books";

    useEffect(()=> {
        async function getSavedBooks() {
          const array = [];
          if(user.savedBooksRef===undefined || user.savedBooksRef===null) return;
          getDocs(user.savedBooksRef).then(querySnapshot => {
              querySnapshot.forEach(doc => array.push(doc.data()));
              setSavedBooks(array);
          })
        }
        async function getFinishedBooks() {
          const array = [];
          if(user.finishedBooksRef===undefined || user.finishedBooksRef===null) return;
          getDocs(user.finishedBooksRef).then(querySnapshot => {
              querySnapshot.forEach(doc => array.push(doc.data()));
              setFinishedBooks(array);
          })
        }

        
        setTimeout(()=>{
            setLoading(true);
            if(user.accessLevel>0){
                getSavedBooks();
                getFinishedBooks();
            }    
            setLoading(false)
        }, 2000);
        ;
    }, [])

    function LibraryRow({title, books, nullTitle, nullSubtitle}) {
        return (
            <>
                {loading? 
                <SkeletonRow title={title} subtitle={""} 
                            figureHeight={"h-42.75"} figureWidth={"w-42.75"} 
                            lineHeights={["h-4", "h-5", "h-3", "h-3"]} 
                            lineWidths={["w-42.75", "w-35", "w-40", "w-20"]}/>
                :

                <div>
                    <BookRow title={title} 
                                subtitle={`${books.length} ${books.length==1? "item" : "items"}`} 
                                books={books} 
                    />
                    {books.length===0 && 
                    <div className="flex flex-col gap-2 items-center w-fit p-8 mx-auto bg-[#f1f6f4] rounded-xl">
                        <h5 className="text-[#042330] font-semibold">{nullTitle}</h5>
                        <p className="text-[#394547]">{nullSubtitle}</p>
                    </div>
                    }
                </div>
                }
            </>

        )
    }

    function SavedBooks() {
        return (
            <LibraryRow title={savedTitle}
                        books={savedBooks}
                        nullTitle="Save your favorite books!"
                        nullSubtitle="When you save a book, it will appear here." />
        )
    }

    function FinishedBooks(){
        return (
            <LibraryRow title={finishedTitle} 
                        books={finishedBooks}
                        nullTitle="Read your favorite books!"
                        nullSubtitle="When you finish listening to a book, it will appear here."/>
        )
    }



    return (
        <div className="row">
            <div className="container text-deepblue overflow-hidden">

                {user.accessLevel===0?               
                
                <LoginPrompt />
                
                :
                
                <div className="flex flex-col gap-14 w-max-255 w-full">
                    <div className="flex flex-col">
                        <SavedBooks />
                    </div>
                    <div>
                        <FinishedBooks />
                    </div>
                </div>
                
                }
            </div>
        </div>
    )
}

export default Page;