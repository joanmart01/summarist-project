import { TrackInfo } from "./TrackInfo";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";

export const AudioPlayer = () => {
    return (
        <div className="fixed z-30 bottom-0 left-0 w-full px-10 bg-[#042330] flex flex-col 
                        p-4 gap-4.5 justify-between items-center text-white md:p-[0.5rem_10px]
                        md:flex-row md:gap-9">
            <TrackInfo />
            <Controls />
            <ProgressBar />
        </div>
    )
}