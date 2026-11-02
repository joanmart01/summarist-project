"use client"
import { useEffect } from "react";
import { useAudioPlayerContext } from "../Player/audio-player-context";
import { useContext } from "react";
import { LayoutContext } from "../../app/layout";

export default function PlayerData({audioData}) {
    const {setBookInfoMode} = useContext(LayoutContext);
    const {setCurrentTrack} = useAudioPlayerContext();

    useEffect(() => {
        setBookInfoMode(false);
        setCurrentTrack(audioData);
    }, [])
    
    return <></>
}