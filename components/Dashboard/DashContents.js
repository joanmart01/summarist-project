import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutContext, smFontSize, lgFontSize, medFontSize, xlgFontSize } from "../../app/layout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { faBookmark, faCircleQuestion, faHouse } from "@fortawesome/free-regular-svg-icons";
import { faGear, faHighlighter, faMagnifyingGlass, 
         faArrowRightFromBracket, faFont } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";


const DashContents = ({heightClass}) => {
    const defaultSelection = 1;
    const pathname = usePathname();
    const router = useRouter();
    
    const {user, bookInfoMode, setFontSize, fontSize, 
           showLoginModal, readingMode, setBookInfoMode} = useContext(LayoutContext);

    const [currentSelection, setSelection] = useState(defaultSelection);
    const [login, setLoginMode] = useState();

    useEffect(() => {
        switch(pathname) {
            case "/for-you":
                setSelection(defaultSelection);    
                setBookInfoMode(true);
                break;
            case "/library":
                setSelection(2);
                setBookInfoMode(true);
                break;
            case "/settings":
                setSelection(5);
                setBookInfoMode(true);
                break;
            case "/player":
                setSelection(-1);
                setBookInfoMode(false);
                console.log("here");
                break;
            default:
                setSelection(-1);
        }        
    }, [pathname])

    useEffect(()=> {
        setLoginMode(user.accessLevel==0);
    }, [user.accessLevel]);
    

    const UserBtn = () => {
        function handleClick() {
            if(login) showLoginModal(true);
            else signOut(auth);
        }
        return (
            <div className="dashboard__link pl-6 cursor-pointer" onClick={handleClick}>
                <div className="flex items-center justify-center h-full mr-2 text-[24px]">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="1px" />
                </div>
                {login? "Login" : "Logout"}
            </div>
        )
    }


    const FontBtn = ({size}) => {
        function handleClick() {
            console.log("size: " + size);   
        }        
        return (
            <div className="flex flex-col">
                <button className="" 
                        onClick={() => setFontSize(size)}>
                    <FontAwesomeIcon icon={faFont} fontSize={size.num} />
                </button>
                <div className={`w-8 h-1 ${fontSize==size? "bg-coolgreen" : "bg-[#f7faf9]"}`} />
            </div>

        )
    }


    const DashLink = ({linkId, text, icon, route, currSelection}) => {
        function handleClick() {
            if(pathname !== route) router.push(route);
        }
        return (
            <div className={`${!route? "cursor-not-allowed " : "cursor-pointer"}`}>
                <div className={`dashboard__link ${!route && "pointer-events-none"}`}
                        onClick={handleClick}>
                    <div className={`w-1.25 h-full mr-4
                                    ${currSelection==linkId && bookInfoMode? "bg-coolgreen" : "bg-[#f7faf9]"}`}></div>
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


    return (
        <div className={`flex flex-col justify-between pb-5 ${heightClass}`}>
            <ul className="flex flex-col gap-2">
                <DashLink linkId={defaultSelection} text="For you" icon={faHouse} route="/for-you" currSelection={currentSelection} />
                <DashLink linkId={2} text="Library" icon={faBookmark} route="/library" currSelection={currentSelection} />
                <DashLink linkId={3} text="Highlights" icon={faHighlighter} currSelection={currentSelection} />
                <DashLink linkId={4} text="Search" icon={faMagnifyingGlass} currSelection={currentSelection} />
                
                {readingMode &&
                <div className="flex items-end h-14 ml-6 gap-2 text-deepblue">
                    <FontBtn size={smFontSize} />
                    <FontBtn size={medFontSize} />
                    <FontBtn size={lgFontSize} />
                    <FontBtn size={xlgFontSize} />
                </div> }
                
            </ul>
            <ul className="flex flex-col gap-2">
                <DashLink linkId={5} text="Settings" icon={faGear} route="/settings" currSelection={currentSelection}/>
                <DashLink linkId={6} text="Help & Support" icon={faCircleQuestion} currSelection={currentSelection} />
                <UserBtn />
            </ul>
        </div>
    )
}

export default DashContents;