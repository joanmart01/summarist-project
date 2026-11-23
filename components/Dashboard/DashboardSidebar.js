import DashContents from "./DashContents";

function DashboardSidebar({heightClass}) {
    return (
        <div className={`hidden md:flex md:flex-col md:justify-start bg-[#f7faf9] gap-10 h-screen`}>
            <figure className="flex items-center justify-center w-50 h-10 pt-8 px-2.5">
                <img className="w-full" src="/images/logo.png" alt="logo" />
            </figure> 
            <DashContents heightClass={heightClass} />
        </div>
    )
}

export default DashboardSidebar;