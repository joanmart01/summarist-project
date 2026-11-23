import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { useAudioPlayerContext } from "../Player/audio-player-context";
import { LayoutContext } from "@/app/layout";
import { BsFillPauseFill, BsFillPlayFill, BsArrowClockwise, BsArrowCounterclockwise} from "react-icons/bs";
import { addToFinishedLibrary } from "@/firebase";

export const Controls = () => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const {currentUser} = useContext(LayoutContext);
    const {currentTrack, audioRef, setTimeProgress, progressBarRef} = useAudioPlayerContext();
    const playAnimationRef = useRef<number | null>(null);
    
    const uploadDuration = () => {
        const seconds = currentTrack?.duration;
        if(seconds !== undefined) {
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
        if(audioRef.current && progressBarRef.current && currentTrack?.duration) {
            const currentTime = audioRef.current.currentTime;
            setTimeProgress(currentTime);
            progressBarRef.current.value = currentTime.toString();
            progressBarRef.current.style.setProperty('--range-progress', `${(currentTime / currentTrack.duration) * 100}%`)
        }
    }, [currentTrack?.duration, setTimeProgress, audioRef, progressBarRef])

    const startAnimation = useCallback(() => {
        if(audioRef.current && progressBarRef.current && currentTrack?.duration) {
            const animate = () => {
                updateProgress();
                playAnimationRef.current = requestAnimationFrame(animate);
            }
            playAnimationRef.current = requestAnimationFrame(animate);
        }
    }, [updateProgress, currentTrack?.duration, audioRef, progressBarRef]);

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
        <div className="flex gap-4 items-center justify-center md:w-1/3">
            <audio src={currentTrack?.audioLink} 
                   ref={audioRef}
                   onEnded={() => addToFinishedLibrary(currentUser.firestoreID, currentTrack)}
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