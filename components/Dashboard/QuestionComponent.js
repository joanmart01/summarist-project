import { FaChevronDown} from "react-icons/fa6";

const QuestionComponent = ({question, answer, id, currentQuestion, setCurrentQuestion}) => {
    function handleClick() {
        setCurrentQuestion((prev) => prev != id ? id : -1);
    }
    return (
        <div className="flex flex-col border-b border-[#ddd] cursor-pointer"
                onClick={handleClick}>
            <div className="flex justify-between py-6 items-center">
                <h3 className="text-deepblue font-medium">{question}</h3>
                <button>
                    <FaChevronDown className={`size-6 stroke-1 ${currentQuestion===id && "rotate-180"} transition-transform duration-300`}/>
                </button>
            </div>
            <div className={`overflow-hidden ${currentQuestion!==id? "h-px" : "h-24"} transition-[height] duration-500`}>
                <p className="pb-6 text-[#394547]">{answer}</p>
            </div>
        </div>
    )
}

export default QuestionComponent;