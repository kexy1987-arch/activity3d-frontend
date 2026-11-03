"use client"

export const dynamic = "force-dynamic";

import MainTitle from "@/app/components/mainTitle/mainTitle"
import { Player, RoomCreateRequest, Room, RoomRes, GameRespond } from "@/lib/types"
import { useState, useEffect } from "react"
import Image from "next/image"
import { titleCase, microsecondDateToString } from "@/lib/helpers"
import NewGame from "@/app/components/dashboard/newGame/newGame";
import Lobby from "@/app/components/dashboard/lobby/lobby";
import MsgBar from "@/app/components/msgBar/msgBar";
import Settings from "@/app/components/dashboard/settings/settings";

type Props = {
    player: Player;
    createRoom: (room: RoomCreateRequest) => Promise<RoomRes>;
    joinLobby: (roomId: string, player: Player) => Promise<GameRespond>;
    deleteRoom: (roomId: string) => Promise<boolean>;
    playerUpdate: (formData: FormData) => Promise<GameRespond>;
}

export default function Dashboard({player, createRoom, deleteRoom, joinLobby, playerUpdate}: Props){
    const [show, setShow] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);
    const [newGameReq, setNewGameReq] = useState<RoomCreateRequest | null>(null);
    const [newRoom, setNewRoom] = useState<Room | null>(null);
    const [msg, setMsg] = useState("");
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [currPlayer, setCurrPlayer] = useState<Player>(player);

    useEffect(() => {
        async function newGame(){
            if (!newGameReq) return;
            const room = await createRoom(newGameReq);
            if (room.room) {
                setNewRoom(room.room);
                setShowNewGame(false);
            }
        }

        newGame();
        
    }, [newGameReq])

    useEffect(() => {
        setShow(true)
        console.log(currPlayer)
    }, []);

    return(
        <div>
            <MsgBar msg={msg} setMsg={setMsg}/>
            <div className={`absolute top-[50%] left-[50%] ${showSettings ? "translate-x-[-50%] opacity-100": "translate-x-5 opacity-0 scale-0"} transition-all z-10`}>
                <Settings player={currPlayer} playerUpdate={playerUpdate} setPlayer={setCurrPlayer} setMsg={setMsg}/>
            </div>            
            <div className={`pt-5 transition-all duration-700 ease-out ${show ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
                <MainTitle />
                <div className="w-fit mt-35 border-2 rounded-lg mx-auto bg-black/20 shadow-[var(--shadow)]">
                    <div className="p-2 flex justify-between gap-5">
                        <div className="flex items-center gap-5">
                            <div className="w-[100px]">
                                <Image
                                    loading="eager"
                                    src={player.avatar_url ? player.avatar_url : "/question-mark-vector-icon.jpg"}
                                    width={300}
                                    height={300}
                                    alt="Player avatar"
                                    style={{ boxShadow: "var(--shadow)", borderRadius: "7px", overflow: "hidden" }}
                                    className="object-contain w-[170px] h-[170px]"
                                />
                            </div>
                            <div>
                                <p className="text-center text-lg">{!currPlayer.first_login ? "Welcome" : "Welcome back"}, {titleCase(currPlayer.name)}!</p>
                                <p className="text-center text-sm">Last visit {currPlayer.last_seen ? microsecondDateToString(currPlayer.last_seen) : ""}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setShowSettings(!showSettings)}>
                                <Image
                                src="/Setting.svg"
                                width={60}
                                height={60}
                                alt="setting button"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center m-5">
                        <button onClick={() => setShowNewGame(!showNewGame)} className="rounded-lg bg-green-600 px-1 shadow-[var(--shadow)]">New Game</button>
                    </div>
                    <div className={`${showNewGame ? "h-50 opacity-100" : "h-0 opacity-0"} overflow-hidden transition-all duration-300`}>
                        <NewGame player={currPlayer} setNewGameReq={setNewGameReq} />
                    </div>
                    <Lobby newRoom={newRoom} setNewRoom={setNewRoom} setMsg={setMsg} joinLobby={joinLobby} player={currPlayer} deleteRoom={deleteRoom} />
                </div>
            </div>
        </div>
    )
}