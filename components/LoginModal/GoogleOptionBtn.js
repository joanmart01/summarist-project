export default function GoogleOptionBtn({signInFunction, text, loading}){
    return (
        <button className="relative modal__comp--size bg-[#4285f4] hover:bg-[#3367d6] text-white
                            active:translate-y-0.25 transition-colors duration-200"
                onClick={signInFunction}>
            <img className="absolute rounded top-0.5 left-0.5 w-9 h-9 bg-white" src="/images/google.png" />
            {loading? "..." : text}
        </button>
    )
}