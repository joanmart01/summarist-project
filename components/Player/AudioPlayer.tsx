import { TrackInfo } from "./TrackInfo";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";

export const AudioPlayer = () => {
    return (
        <div className="fixed z-4 bottom-0 left-0 w-full min-h-8 px-10 bg-[#042330] flex flex-col 
                        gap-9 lg:flex-row justify-between items-center text-white p-[0.5rem_10px]">
            <TrackInfo />
            <Controls />
            <ProgressBar />
        </div>
    )
}