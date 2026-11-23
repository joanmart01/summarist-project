import LoadingSpinner from "../Loading/LoadingSpinner";

export default function GoogleOptionBtn({signInFunction, text, loading}){
    return (
        <button className="relative flex justify-center items-center modal__comp--size bg-[#4285f4] hover:bg-[#3367d6] text-white
                            active:translate-y-px transition-colors duration-200"
                onClick={signInFunction}>
            <img className="absolute rounded top-0.5 left-0.5 w-9 h-9 bg-white" src="/images/google.png" />
            {loading? 
            <LoadingSpinner size={"size-6"} borderThickness={"border-3"} borderColor={"border-white"} /> 
            : 
            text}
        </button>
    )
}