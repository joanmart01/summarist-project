"use client";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCircleQuestion, faHouse } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faFont, faGear, faHighlighter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function DashboardSidebar({readingMode, bookInfoMode, bookInfoModeFunction, 
                        fontSizeFunction, userSetterFunction, currentUser, openLoginModal}) {
    const router = useRouter();
    
    const defaultSelection = 1;
    const [currentSelection, setSelection] = useState(defaultSelection);
    const prevSelection = useRef(null);

    const defaultFontSize = 16;
    const [currentFont, setCurrentFont] = useState(defaultFontSize);
    const prevFont = useRef(null);

    const DashLink = ({linkId, text, icon, route}) => {
        const id = linkId;
        function handleClick() {
            setSelection((prev) => {
                prevSelection.current = prev;
                return linkId;
            });
            if(prevSelection!=linkId) {
                bookInfoModeFunction(true);
                router.push(`/${route}`);
            }
        }
        return (
            <div className={`${!route && "cursor-not-allowed "}`}>
                <div className={`dashboard__link ${!route && "pointer-events-none"}`}
                     onClick={handleClick}>
                    <div className={`w-[5px] h-full mr-4
                                    ${currentSelection==id && bookInfoMode? "bg-[#2bd97c]" : "bg-[#f7faf9]"}`}></div>
                    {icon && 
                    <div className="flex items-center justify-center h-full mr-2 text-[24px]">
                        <FontAwesomeIcon icon={icon} size="1px" />
                    </div>
                    }
                    {text}
                </div>
            </div>
        )
    }


    const UserBtn = ({login}) => {
        const text = login? "Login" : "Logout";
        function handleClick() {
            if(login) openLoginModal(true);
            else userSetterFunction(null);
        }
        return (
            <div className="dashboard__link pl-6 cursor-pointer" onClick={handleClick}>
                <div className="flex items-center justify-center h-full mr-2 text-[24px]">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="1px" />
                </div>
                {text}
            </div>
        )
    }


    const FontBtn = ({size}) => {
        function handleClick() {
            setCurrentFont((prev) => {
                prevFont.current = prev;
                return size;
            });
            if(prevFont != size) {
                fontSizeFunction(size);
            }
        }
        return (
            <div className="flex flex-col">
                <button className="" 
                        onClick={handleClick}>
                    <FontAwesomeIcon icon={faFont} fontSize={size} />
                </button>
                <div className={`w-8 h-1 ${currentFont==size? "bg-[#2bd97c]" : "bg-[#f7faf9]"}`} />
            </div>

        )
    }


    return (
        <div className="flex flex-col items-center p-2 bg-[#f7faf9] w-50 min-w-50 h-screen gap-10">
            <figure className="flex items-center justify-center max-w-40 h-15 pt-4">
                <img src="/images/logo.png" alt="logo" />
            </figure> 
            <div className="flex flex-col justify-between h-full pb-5">
                <ul className="flex flex-col gap-2">
                    <DashLink linkId={defaultSelection} text="For you" icon={faHouse} route="for-you" />
                    <DashLink linkId={2} text="Library" icon={faBookmark} route="library" />
                    <DashLink linkId={3} text="Highlights" icon={faHighlighter} />
                    <DashLink linkId={4} text="Search" icon={faMagnifyingGlass} />
                    
                    {readingMode &&
                    <div className="flex items-end h-14 ml-6 gap-2 text-[#032b41]">
                        <FontBtn size={defaultFontSize} />
                        <FontBtn size={18} />
                        <FontBtn size={24} />
                        <FontBtn size={26} />
                    </div> }
                    
                </ul>
                <ul className="flex flex-col gap-2">
                    <DashLink linkId={5} text="Settings" icon={faGear} route="settings"/>
                    <DashLink linkId={6} text="Help & Support" icon={faCircleQuestion} />
                    {currentUser==null? <UserBtn login={true} /> : <UserBtn login={false} />}
                </ul>
           </div>
        </div>
    )
}

export default DashboardSidebar;