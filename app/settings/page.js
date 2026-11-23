"use client"
import { useContext } from "react";
import { LayoutContext } from "../layout";
import {useRouter} from "next/navigation";
import { upperCaseStr } from "../../components/tools";
import { deleteCurrentUserAccount } from "../../firebase";
import LoginPrompt from "../../components/LoginPrompt";

function Page() {
    const router = useRouter();
    const {showDashboard, user} = useContext(LayoutContext);
    
    function goToChoosePlanPage() {
        showDashboard(false);
        router.push("/choose-plan");
    }

    return (
        <div className="row flex justify-center">
            <div className="flex flex-col w-full max-w-267 py-6 text-deepblue">
                <h2 className="pb-4 border-b border-[#e1e7ea]">Settings</h2>

                    {user.accessLevel==0?
                    
                    <LoginPrompt/>

                    :

                    <div>
                        <div className="flex flex-col gap-2 pb-6 pt-8 items-start border-b border-[#e1e7ea]">
                            <h5 className="font-bold">Your Subscription plan</h5>
                            <p>{upperCaseStr(user.subscription)}</p>
                            {user.accessLevel < 3 &&
                            <button className="login__btn max-w-50"
                                    onClick={goToChoosePlanPage}>
                                {user.accessLevel < 2 ? "Upgrade to Premium" : "Upgrade to Premium-Plus"}
                            </button>}
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2 pb-6 pt-8 border-b border-[#e1e7ea]">
                            <h5 className="font-bold">Email</h5>
                            <p>{user.email}</p>
                        </div>

                        <div className="flex pb-6 pt-8">
                            {user.accessLevel > 0 &&
                            <button className="py-2 px-4 text-sm w-40 rounded-lg bg-amber-100 
                                            hover:bg-amber-200 active:bg-amber-300 transition-colors duration-300" 
                                    onClick={deleteCurrentUserAccount}>
                                        Delete Account and Cancel Subscription
                            </button>}
                        </div>
                    </div>

                    }
            </div>
            

        </div>
    )
}

export default Page;