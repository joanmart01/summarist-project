export default function MainBtn({mainFunction, text, loading}) {
    return (
        <button className="modal__comp--size bg-[#2bd97c] hover:bg-[#20ba68]
                                      active:translate-y-0.25 transition-colors duration-200"
                onClick={mainFunction}>
            {loading? "..." : text}
        </button>
    )
}