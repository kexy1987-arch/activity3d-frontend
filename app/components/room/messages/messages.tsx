import { RoomMsg } from "@/lib/types"
import { useState, useEffect, useRef } from "react"
import Image from "next/image";

type Props = {
    messages: RoomMsg[];
}

export default function Messages({messages}: Props){
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [pos, setPos] = useState({
        x: 100,
        y: 100
    });
    const [offset, setOffset] = useState({
        x: 0,
        y: 0
    });
    const [dragging, setDragging] = useState<boolean>(false);
    const [didDrag, setDidDrag] = useState<boolean>(false);
    const [chatPos, setChatPos] = useState({
        x: "right-0",
        y: "top-[-65px]"
    });
    const chatRef = useRef<HTMLDivElement>(null);

    function onMouseDown(e: React.MouseEvent) {
        setDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        });
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!dragging) return;
        setDidDrag(true);
        setPos({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
        updateChatPos();
    }

    function onMouseUp() {
        setDragging(false);
    }

    function onClick() {
        if(didDrag){
            setDidDrag(false);
            return;
        }
        setShowMsg(!showMsg)
    }

    useEffect(() => {
        const padding = 20;
        const bubbleWidth = 60;
        const bubbleHeight = 60;

        setPos({
            x: window.innerWidth - bubbleWidth - padding,
            y: window.innerHeight - bubbleHeight - padding,
        });
    }, []);

    function updateChatPos(){
        if (window.innerWidth / 2 < pos.x){
            setChatPos(prev => ({
                ...prev,
                x: "right-0"
            }));
        } else {
            setChatPos(prev => ({
                ...prev,
                x: "left-0"
            }));
        };

        if (window.innerHeight / 2 > pos.y){
            setChatPos(prev => ({
                ...prev,
                y: "bottom-[-250]"
            }));
        } else {
            setChatPos(prev => ({
                ...prev,
                y: "top-[-250]"
            }));
        };
    }

    return(
        <div className={`flex flex-col absolute z-[50]`} style={{left: pos.x, top: pos.y}}>
            <div className="relative">
                {showMsg && <div 
                    className={`
                        absolute
                        ${chatPos.x}
                        ${chatPos.y}
                        h-[250px]
                        w-[200px] 
                        overflow-y-scroll 
                        scrollbar-none 
                        border 
                        rounded-xl 
                        p-3
                        bg-black/30
                        shadow-[var(--shadow)]
                        `}
                        >
                    {messages.map((msg, i) => (
                        <div key={i} className="w-[95%] flex gap-5">
                            <div>
                                {msg.avatar_url
                                    ? <div className="flex flex-col">
                                        <Image
                                            src={msg.avatar_url}
                                            alt="avatar image"
                                            width={40}
                                            height={40}
                                        />
                                        <p>{msg.player_name}</p>
                                    </div>
                                    : <div>
                                        <span>{msg.player_name}</span>
                                    </div>}
                            </div>
                            <div>
                                <p className="flex break-all">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>}
                <div className="flex w-full">
                    <button
                        onMouseDown={(e) => onMouseDown(e)}
                        onMouseMove={(e) => onMouseMove(e)}
                        onMouseUp={() => onMouseUp()}
                        onClick={() => onClick()}
                        className={`border p-1 w-[60px] h-[60px] rounded-2xl bg-blue-400 shadow-[var(--shadow)]`}
                    >
                        Chat
                    </button>
                </div>
            </div>
            
            
        </div>
    )
}