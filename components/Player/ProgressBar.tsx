import { useAudioPlayerContext } from "./audio-player-context"
import { formatTime } from "../tools";

export const ProgressBar = () => {
    
    const {progressBarRef, audioRef, timeProgress, currentTrack, setTimeProgress} = useAudioPlayerContext();
    
    const handleProgressChange = () => {
        if(audioRef.current && progressBarRef.current) {
            const newTime = Number(progressBarRef.current.value);
            audioRef.current.currentTime = newTime;
            setTimeProgress(newTime);
            progressBarRef.current.style
                .setProperty("--range-progress", `${(currentTrack?.duration? newTime / currentTrack.duration : 0) * 100}%`);
        }
    }

    return (
        <div className="flex items-center justify-center gap-5 p-2 w-100 md:w-1/3">
            <span>{formatTime(timeProgress)}</span>
            <input ref={progressBarRef}
                   type="range"
                   defaultValue="0"
                   onChange={handleProgressChange}
                   className={`appearance-none relative w-full h-1 rounded-sm cursor-pointer bg-[#6d787d]
                              before:absolute before:content-['']  before:h-1 before:bg-coolgreen before:rounded-l-sm before:top-0 before:left-0
                              accent-white before:w-[var(--range-progress)]`}  
            />
            <span>{currentTrack?.durationFormatted}</span>
        </div>
    )
}