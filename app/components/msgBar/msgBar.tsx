import { useEffect, useState } from "react"

type Props = {
    msg: string;
    setMsg: (msg: string) => void
}

export default function MsgBar({msg, setMsg}: Props){

    const [message, setMessage] = useState<string | null>(null);
    const [showMsg, setShowMsg] = useState<boolean>(false);

    useEffect(() => {if(!msg) return;
    setMessage(msg);
    setShowMsg(true);
    setTimeout(() => {
        setShowMsg(false);
    }, 6200)
    setTimeout(() => {
        setMessage(null);
        setMsg("");
    }, 7000)}, [msg])

    return(
        <div>
            {message && <div className={`fixed top-0 left-0 z-1 w-full h-fit p-2 bg-yellow-300/70 transition-all duration-700 ${showMsg ? "opacity-100": "opacity-0"}`}>
                {message}
            </div>}
        </div>
        
    )
}