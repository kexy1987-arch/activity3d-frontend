import { GameRespond, Player, RoomMsg } from "@/lib/types"
import { useState, useEffect, useRef } from "react"
import Image from "next/image";

type Props = {
    messages: RoomMsg[];
    sendMessage: (roomId: string, msg: RoomMsg) => Promise<GameRespond>;
    roomId: string;
    player: Player
}

export default function Messages({messages, sendMessage, roomId, player}: Props){
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
        y: "top-[-250px]"
    });
    const chatRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    function handleSend(){
        const chat = chatRef.current;
        const chatMsg = chat?.value;
        if(!chat || !chatMsg) return;
        let roomMsg: RoomMsg = {
            player_name: player.name,
            message: chatMsg
        }

        if(player.avatar_url){
            roomMsg = {
                ...roomMsg,
                avatar_url: player.avatar_url
            }
        }
        sendMessage(roomId, roomMsg);
        chat.value = ""
    }

    function handleMsgKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            handleSend();
        }
    }

    useEffect(() => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, showMsg])

    return(
        <div className={`flex flex-col fixed z-[50]`} style={{left: pos.x, top: pos.y}}>
            <div className="relative">
                {showMsg && <div 
                    className={`
                        absolute
                        ${chatPos.x}
                        ${chatPos.y}
                        h-fit
                        min-h-30
                        max-h-[250px]
                        w-[200px] 
                        overflow-y-scroll 
                        scrollbar-none 
                        border 
                        rounded-xl 
                        bg-black/30
                        shadow-[var(--shadow)]
                        `}
                        >
                    <div ref={scrollRef} className="mb-30 h-fit max-h-50 overflow-scroll scrollbar-none">
                        {messages.map((msg, i) => (
                            <div key={i} className="w-[95%] mx-auto flex items-center gap-5 m-2">
                                <div>
                                    <div className="flex flex-col w-[40px]">
                                        <Image
                                            src={msg.avatar_url ? msg.avatar_url : "/question-mark-vector-icon.jpg"}
                                            alt="avatar image"
                                            width={100}
                                            height={100}
                                            className="rounded-3xl h-[40px] w-[40px]"
                                        />
                                        <p className="text-sm text-center">{msg.player_name}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="border p-1 bg-blue-400 rounded-lg flex break-all">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>                    
                    <div className="absolute bottom-1 flex w-full justify-center">
                        <input onKeyDown={(e) => handleMsgKeyDown(e)} ref={chatRef} type="text" className="border rounded-2xl w-30 px-2 bg-white text-black"/>
                        <button onClick={() => handleSend()}className="bg-white w-8 h-8 rounded-2xl text-black p-1">S</button>
                    </div>
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