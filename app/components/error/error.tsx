"use client"

type Props = {
    msg: string
}

export default function ErrorModal({msg}: Props){

    return (
        <div className="flex flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-red-500/60 rounded p-10 shadow-[var(--shadow)] text-center text-white">
            <h1>Something went wrong.<br></br>Pleade try again later</h1>
            <span>{msg}</span>
        </div>
    )
}