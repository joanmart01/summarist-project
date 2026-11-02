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

    const UpgradeBtn = ({text}) => {
        return (
            <button className="bg-[#2bd97c] py-1"
                    onClick={goToChoosePlanPage}>
                {text}
            </button>
        )
    }

    return (
        <div>
            {currentUser==null?
            
            <div>
                <figure>

                </figure>
                <h2>Log in to your account to see your details.</h2>
                <button className="bg-[#2bd97c] py-1 px-12 rounded"
                        onClick={showLoginModal}>
                    Login
                </button>
            </div>

            :

            <div>
                <div>Settings</div>
                <div>
                    <h2>Your Subscription plan</h2>
                    <p>{currentUser.subscription}</p>

                    {currentUser.subscription=="basic"? 
                    <UpgradeBtn text={"Upgrade to Premium"} />
                    :

                    currentUser.subscription=="premium" &&
                    <UpgradeBtn text={"Upgrade to Premium-Plus"} />
                    }
                </div>
                <div>
                    <h2>Email</h2>
                    <p>{currentUser.email}</p>
                </div>
            </div>
            
            }

        </div>
    )
}

export default Page;