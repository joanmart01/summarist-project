"use client"
import { useEffect } from "react";
import { useAudioPlayerContext } from "../Player/audio-player-context";

export default function PlayerData({book}) {
    const {setCurrentTrack} = useAudioPlayerContext();

    useEffect(() => {
        setCurrentTrack(book);
    }, [])
    
    return <></>
}