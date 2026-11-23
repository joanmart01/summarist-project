import LoadingSpinner from "../Loading/LoadingSpinner";

export default function MainBtn({mainFunction, text, loading}) {
    return (
        <button className="flex justify-center items-center modal__comp--size bg-coolgreen hover:bg-[#20ba68]
                           active:translate-y-px transition-colors duration-200"
                onClick={mainFunction}>
            {loading? <LoadingSpinner size={"size-6"} borderThickness={"border-3"} borderColor={"border-white"} /> 
            : 
            text}
        </button>
    )
}