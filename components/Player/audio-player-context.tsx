import { createContext, useContext, useState,
         ReactNode, Dispatch, SetStateAction, 
         useRef} from 'react';
import { RefObject } from 'react';

export interface Track {
    audioLink: string
    author: string
    authorDescription: string
    averageRating: number
    bookDescription: string
    duration: number
    durationFormatted: string
    id: string
    imageLink: string
    keyIdeas: number
    librarySection: string
    status: string
    subTitle: string
    subscriptionRequired: boolean
    summary: string
    tags: string[]
    title: string
    totalRating: number
    type: string
}

interface AudioPlayerContextType {
    currentTrack: Track | undefined;
    setCurrentTrack: Dispatch<SetStateAction<Track | undefined>>;
    audioRef: RefObject<HTMLAudioElement | null>;
    progressBarRef: RefObject<HTMLInputElement | null>;
    timeProgress: number;
    setTimeProgress: Dispatch<SetStateAction<number>>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({children}: {children: ReactNode}) => {
    const [currentTrack, setCurrentTrack] = useState<Track>();
    const [timeProgress, setTimeProgress] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);
    
    const contextValue: AudioPlayerContextType = {
        currentTrack,
        setCurrentTrack,
        audioRef,
        progressBarRef,
        timeProgress,
        setTimeProgress
    };
    
    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
        </AudioPlayerContext.Provider>
    )
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
    const context = useContext(AudioPlayerContext);
    if (context === undefined)
        throw new Error('useAudioPlayerContext must be used within an AudioPlayerProvider');
    return context;
};