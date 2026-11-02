export default function SwitchBtn({switchFunction, value, text}) {
    return (
            <button className="w-full text-center font-light py-2 text-[#116be9] 
                             bg-[#f1f6f4] hover:bg-[#e1e9e8] transition-colors duration-200"
                    onClick={(e) => switchFunction(value)}>
                  {text}
            </button>
    )
}