export const formatTime = (time: number | undefined): string => {
        if(typeof time === 'number' && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const formatMinutes = minutes.toString().padStart(2, '0');
            const formatSeconds = seconds.toString().padStart(2, '0');
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
}

export const upperCaseStr = (val: string): string => {
        if(val != undefined) {
                let str = val.toString();
                return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "";
}