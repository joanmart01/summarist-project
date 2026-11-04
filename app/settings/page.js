"use client"
import { useContext } from "react";
import { LayoutContext } from "../layout";
import {useRouter} from "next/navigation";

function Page() {
    const router = useRouter();
    const {currentUser, showLoginModal, showDashboard} = useContext(LayoutContext);

    function goToChoosePlanPage() {
        showDashboard(false);
        router.push("/choose-plan");
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full max-w-267 py-6 text-deepblue">
                <h2 className="pb-4 border-b border-[#e1e7ea]">Settings</h2>

                    {currentUser==null?
                    
                    <div className="flex flex-col self-center items-center max-w-115">
                        <img src="images/login.png" className="w-full h-full" />
                        <h3 className="mb-4">Log in to your account to see your details.</h3>
                        <button className="login__btn max-w-45"
                                onClick={showLoginModal}>
                            Login
                        </button>
                    </div>

                    :

                    <div>
                        <div className="flex flex-col gap-2 pb-6 pt-8 items-start border-b border-[#e1e7ea]">
                            <h5 className="font-bold">Your Subscription plan</h5>
                            <p>{currentUser.subscription}</p>

                            <button className="login__btn max-w-45"
                                    onClick={goToChoosePlanPage}>
                                    {currentUser.subscription=="basic"? 
                                    "Upgrade to Premium"
                                    :
                                    currentUser.subscription=="premium" &&
                                    "Upgrade to Premium-Plus"
                            }
                            </button>

                            
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2 pb-6 pt-8">
                            <h5 className="font-bold">Email</h5>
                            <p>{currentUser.email}</p>
                        </div>
                    </div>

                    }
            </div>
            

        </div>
    )
}

export default Page;