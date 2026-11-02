import { useEffect, useState } from "react"

type Props = {
    msg: string;
    setMsg: (msg: string) => void
}

type Toast = {
    id: number;
    text: string;
    visible: boolean;
};


export default function MsgBar({msg, setMsg}: Props){

    const [messages, setMessages] = useState<Toast[]>([]);

    useEffect(() => {
        if (!msg) return;

        const id = Date.now();

        setMessages(prev => [...prev, { id, text: msg, visible: true }]);

        setMsg("");
    }, [msg]);

    useEffect(() => {
        messages.forEach(m => {
            if (m.visible) {
                setTimeout(() => {
                    setMessages(prev =>
                        prev.map(x =>
                            x.id === m.id ? { ...x, visible: false } : x
                        )
                    );
                }, 6000);

                setTimeout(() => {
                    setMessages(prev => prev.filter(x => x.id !== m.id));
                }, 7000);
            }
        });
    }, [messages]);



    return (
        <div className={`fixed top-0 left-0 w-full z-[9999] space-y-2 p-2 ${messages.length > 0 ? "bg-red-500" : ""} transition-all`}>
            {messages.map(m => (
                <div
                    key={m.id}
                    className={`text-red-500 font-bold w-full p-2 bg-yellow-300/90 
                            transition-all duration-700
                            ${m.visible ? "opacity-100" : "opacity-0"}`}
                >
                    {m.text}
                </div>
            ))}
        </div>
    );

}