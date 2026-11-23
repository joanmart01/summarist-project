"use client"
import { useEffect, useContext } from "react";
import { LayoutContext } from "../../layout";
import { useAudioPlayerContext } from "../../../components/Player/audio-player-context";


function PlayerPage() {
    const {showPlayer, setReadingMode, fontSize} = useContext(LayoutContext);
    const {currentTrack} = useAudioPlayerContext();

    useEffect(() => {
        showPlayer(true);
        setReadingMode(true);

        return () => {
            showPlayer(false);
            setReadingMode(false);
        }

    }, [])

    return (
        <div className="row">
                <div className="flex flex-col p-6 max-w-200 mx-auto my-0 text-deepblue whitespace-pre-line">
                    {currentTrack && 
                    <>
                        <h4 className="md:text-[24px] font-bold border-b border-[#e1e7ea] max-w-200 pb-4 mb-8">
                            {currentTrack.title || ""}
                        </h4>
                        <div className={`text-sm leading-normal max-w-200 ${fontSize.str}`}>
                            {currentTrack.summary || ""}
                        </div>
                    </>}
                </div>
        </div>

    )
}

export default PlayerPage;
