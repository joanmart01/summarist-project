function LargeButton({text, bgColor, textColor, icon, clickFunction}) {

    return (
        <button className={`relative modal__comp--size ${bgColor} ${textColor}
                            active:translate-y-0.25 transition-colors duration-200`}
                onClick={clickFunction}>
            {
            icon &&
            <figure className="absolute rounded top-0.5 left-0.5 w-9 h-9">
                <img src={icon} />
            </figure>
            }
            {text}
        </button>
    )

}

export default LargeButton;