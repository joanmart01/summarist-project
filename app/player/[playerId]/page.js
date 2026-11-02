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
        <div>
            <h1 className="text-2xl font-bold">
                {currentTrack.title || ""}
            </h1>
            <div className={`leading-normal text-${convertFontSize(fontSize)}`}>
                {currentTrack.summary || ""}
            </div>
        </div>
    )
}

export default PlayerPage;
