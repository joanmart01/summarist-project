import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioPlayerContext } from "../Player/audio-player-context";
import { BsFillPauseFill, BsFillPlayFill, BsArrowClockwise, BsArrowCounterclockwise} from "react-icons/bs";

export const Controls = () => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const {currentTrack, audioRef, duration, setDuration, setTimeProgress, progressBarRef} = useAudioPlayerContext();
    const playAnimationRef = useRef<number | null>(null);
    
    const uploadDuration = () => {
        const seconds = audioRef.current?.duration;
        if(seconds !== undefined) {
            setDuration(seconds);
            if(progressBarRef.current) 
                progressBarRef.current.max = seconds.toString(); 
        }
    }

    function skipForward() {
        if(audioRef.current) {
            audioRef.current.currentTime += 10;
            updateProgress();
        }   
    }

    function skipBackward() {
        if(audioRef.current) {
            audioRef.current.currentTime -= 10;
            updateProgress();
        }   
    }

    const updateProgress = useCallback(() => {
        if(audioRef.current && progressBarRef.current && duration) {
            const currentTime = audioRef.current.currentTime;
            setTimeProgress(currentTime);
            progressBarRef.current.value = currentTime.toString();
            progressBarRef.current.style.setProperty('--range-progress', `${(currentTime / duration) * 100}%`)
        }
    }, [duration, setTimeProgress, audioRef, progressBarRef])

    const startAnimation = useCallback(() => {
        if(audioRef.current && progressBarRef.current && duration) {
            const animate = () => {
                updateProgress();
                playAnimationRef.current = requestAnimationFrame(animate);
            }
            playAnimationRef.current = requestAnimationFrame(animate);
        }
    }, [updateProgress, duration, audioRef, progressBarRef]);

    useEffect(()=> {
        if(isPlaying) {
            console.log("playing");
            audioRef.current?.play();
            startAnimation();
        }
        else {
            audioRef.current?.pause();
            if(playAnimationRef.current !== null) {
                cancelAnimationFrame(playAnimationRef.current);
                playAnimationRef.current = null;
            }
            updateProgress();
        }
        return () => {
            if(playAnimationRef.current !== null) {
                cancelAnimationFrame(playAnimationRef.current);
            }
        }
        
    }, [isPlaying, startAnimation, updateProgress, audioRef]);

    return (
        <div className="flex gap-4 items-center justify-center w-1/3">
            <audio src={currentTrack.audioLink} 
                   ref={audioRef}
                   onLoadedMetadata={uploadDuration}
            />
            <button onClick={skipForward} className="relative flex justify-center h-7 w-7 items-center p-0">
                <p className="text-[10px] pt-0.5">10</p>
                <BsArrowCounterclockwise className="size-full absolute top-0" />
            </button>
            <button className="flex justify-center size-10 items-center p-0 rounded-full bg-white text-[#042330]"
                    onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? (
                <BsFillPauseFill className="size-7" />
                ) : (
                <BsFillPlayFill className="size-7" />
                )}
            </button>
            <button onClick={skipBackward} className="relative flex justify-center h-7 w-7 items-center p-0">
                <p className="text-[10px] pt-0.5">10</p>
                <BsArrowClockwise className="size-full absolute top-0" />
            </button>
        </div>
    )
}