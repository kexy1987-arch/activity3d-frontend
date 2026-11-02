type Props = {
    countdownValue: number;
}

export default function Countdown({countdownValue}:Props){

    return(
        <div className="flex justify-center items-center h-full">
            <span>Game start in</span><span key={countdownValue} className="text-6xl flip translate-all text-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]">{countdownValue}</span><span>{countdownValue > 1 ? "seconds" : "second"}</span>
        </div>
    )
}