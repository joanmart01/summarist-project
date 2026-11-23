import { useContext } from "react";
import { LayoutContext } from "../app/layout";

export default function LoginPrompt() {
    const {showLoginModal} = useContext(LayoutContext);
    return (
        <>
            <div className="flex flex-col self-center items-center max-w-115">
                <img src="images/login.png" className="w-full h-full" />
                <h3 className="mb-4">Log in to your account to see your details.</h3>
                <button className="login__btn max-w-45"
                        onClick={showLoginModal}>
                    Login
                </button>
            </div>
        </>
    )
}