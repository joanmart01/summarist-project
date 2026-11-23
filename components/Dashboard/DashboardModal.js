import { LayoutContext } from "../../app/layout";
import { useContext } from "react";
import DashContents from "./DashContents";

export default function DashboardModal({heightClass}) {
    const {showDashModal} = useContext(LayoutContext);
    return (
        <div className="fixed flex items-center justify-start z-20 inset-0 bg-black/75"
            onClick={() => showDashModal(false)}>
            <div className={`flex flex-col justify-start items-left p-2 gap-10
                            w-4/5 h-screen bg-[#f7faf9]`}
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center w-full">
                    <figure className="flex items-center justify-center max-w-40 h-15 pt-4">
                        <img src="/images/logo.png" alt="logo" />
                    </figure>                    
                </div>

                <DashContents heightClass={heightClass} />
            </div>
        </div>
    )
}