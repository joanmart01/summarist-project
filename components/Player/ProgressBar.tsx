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
        <div className="flex items-center justify-center gap-5 w-full">
            <span>{formatTime(timeProgress)}</span>
            <input ref={progressBarRef}
                   type="range"
                   defaultValue="0"
                   onChange={handleProgressChange}
                   className={`relative max-w-[80%] w-full h-0.5 rounded-sm cursor-pointer bg-white
                              before:absolute before:content-[''] before:bg-[rgb(43,217,124)] before:rounded-l-sm before:top-0 before:left-0
                              before:h-0.5 before:w-[var(--range-progress)] 
                              appearance-none
                              [&::-webkit-slider-thumb]:w-0.5 
                              [&::-webkit-slider-thumb]:h-0.5 
                              [&::-webkit-slider-thumb]:rounded-full
                              [&::-webkit-slider-thumb]:border-none
                              [&::-webkit-slider-thumb]:bg-white
                            `}  
            />
            <span>{formatTime(duration)}</span>
        </div>
    )
}