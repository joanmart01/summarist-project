"use client"
import { useRouter, useParams } from "next/navigation";
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


function convertFontSize(num) {
    switch(num) {
        case 16: return "base";
        case 18: return "lg";
        case 24: return "2xl";
        case 26: return "3xl";
    }
}

    return (
        <div className="text-deepblue p-6 max-w-200 mx-auto my-0 whitespace-pre-line">
            <h3 className="text-2xl font-bold border-b border-[#e1e7ea] max-w-200 pb-4 mb-8">
                {currentTrack.title || ""}
            </h3>
            <div className={`leading-normal max-w-200 text-${convertFontSize(fontSize)}`}>
                {currentTrack.summary || ""}
            </div>
        </div>
    )
}

export default PlayerPage;
