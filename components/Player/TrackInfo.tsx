import { BsMusicNoteBeamed } from "react-icons/bs";
import { useAudioPlayerContext } from "./audio-player-context";

export const TrackInfo = () => {

    const {currentTrack} = useAudioPlayerContext();
    
    return (
        <div className="flex items-center gap-4 md:w-1/3">
            <div className="size-12 flex items-center justify-center rounded-md overflow-hidden">
            {currentTrack?.imageLink ? (
                <img
                className="w-full h-full object-cover"
                src={currentTrack?.imageLink}
                alt="audio avatar"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
                <span className="text-xl text-gray-600">
                    <BsMusicNoteBeamed />
                </span>
                </div>
            )}
            </div>
            <div>
            <p className="text-wrap">
                {currentTrack?.title}
            </p>
            <p className="text-sm text-gray-400">{currentTrack?.author}</p>
            </div>
        </div>
    )
}