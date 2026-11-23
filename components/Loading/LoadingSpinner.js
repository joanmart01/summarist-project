
export default function LoadingSpinner({size, borderThickness, borderColor}) {
    return (
        <div className={`${size || "size-8"} ${borderThickness || "border-4"} ${borderColor || "border-blue-500"} 
                        border-t-transparent rounded-full animate-spin`}></div>
    )
}