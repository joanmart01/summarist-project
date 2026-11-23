"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { setDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { LayoutContext } from "../app/layout";
import { useContext, useEffect, useState } from "react";

function AddToLibraryBtn({book}) {
    const {user} = useContext(LayoutContext);
    const[added, setAdded] = useState(false);
    const [docRef, setDocRef] = useState();
    
    useEffect(()=> {
        if(user.accessLevel>0) {
            const ref = doc(user.savedBooksRef, book.id);
            setDocRef(ref);
            ref && getDoc(ref).then(docSnap => setAdded(docSnap.exists()));
        }   
    }, [])
    
    async function handleClick(add) {
        if(user.accessLevel>0) {
            if(add) await setDoc(docRef, {...book});
            else await deleteDoc(docRef);
            setAdded((prev)=> !prev);
        }
    }

    return (
        <>
            {added?
            <button className="flex items-center gap-2 font-medium text-[#0365f2] mb-10 
                            hover:text-[#044298] transition-colors duration-300"
                    onClick={() => handleClick(false)}>
                <FontAwesomeIcon icon={solidBookmark} />
                <h5>Saved in My Library</h5>
            </button>

            :

            <button className="flex items-center gap-2 font-medium text-[#0365f2] mb-10 
                            hover:text-[#044298] transition-colors duration-300"
                    onClick={() => handleClick(true)}>
                <FontAwesomeIcon icon={regularBookmark} />
                <h5>Add title to My Library</h5>
            </button>
            }
        </>
    )
}

export default AddToLibraryBtn;