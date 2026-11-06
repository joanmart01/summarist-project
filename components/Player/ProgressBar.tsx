import { useEffect, useState } from "react";
import { useAudioPlayerContext } from "./audio-player-context"

export const ProgressBar = () => {
    
    const {progressBarRef, audioRef, timeProgress, duration, setTimeProgress} = useAudioPlayerContext();
    
    const handleProgressChange = () => {
        if(audioRef.current && progressBarRef.current) {
            const newTime = Number(progressBarRef.current.value);
            audioRef.current.currentTime = newTime;
            setTimeProgress(newTime);
            progressBarRef.current.style.setProperty("--range-progress", `${(newTime / duration) * 100}%`);
        }
    }

    const formatTime = (time: number | undefined): string => {
        if(typeof time === 'number' && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const formatMinutes = minutes.toString().padStart(2, '0');
            const formatSeconds = seconds.toString().padStart(2, '0');
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    }

    return (
        <div className="flex items-center justify-center gap-5 w-1/3">
            <span>{formatTime(timeProgress)}</span>
            <input ref={progressBarRef}
                   type="range"
                   defaultValue="0"
                   onChange={handleProgressChange}
                   className={`appearance-none relative max-w-[80%] w-full h-1 rounded-sm cursor-pointer bg-[#6d787d]
                              before:absolute before:content-['']  before:h-1 before:bg-coolgreen before:rounded-l-sm before:top-0 before:left-0
                              accent-white before:w-[var(--range-progress)]`}  
            />
            <span>{formatTime(duration)}</span>
        </div>
    )
}