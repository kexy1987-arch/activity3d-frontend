"use client"

export const dynamic = "force-dynamic";

import MainTitle from "@/app/components/mainTitle/mainTitle"
import { Player, RoomCreateRequest, Room, RoomRes, GameRespond } from "@/lib/types"
import { useState, useEffect } from "react"
import Image from "next/image"
import { titleCase, microsecondDateToString } from "@/lib/helpers"
import NewGame from "@/app/components/newGame/newGame";
import Lobby from "@/app/components/lobby/lobby";
import MsgBar from "@/app/components/msgBar/msgBar";

type Props = {
    player: Player;
    createRoom: (val: RoomCreateRequest) => Promise<RoomRes>;
    joinLobby: (val1: string, val2: Player) => Promise<GameRespond>;
    deleteRoom: (val: string) => Promise<boolean>;
}

export default function Dashboard({player, createRoom, deleteRoom, joinLobby}: Props){
    const [show, setShow] = useState(false);
    const [showNewGame, setShowNewGame] = useState(false);
    const [newGameReq, setNewGameReq] = useState<RoomCreateRequest | null>(null);
    const [newRoom, setNewRoom] = useState<Room | null>(null);
    const [msg, setMsg] = useState("");

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

    useEffect(() => setShow(true), []);

    return(
        <div>
            <MsgBar msg={msg} setMsg={setMsg}/>
            <div className={`pt-5 transition-all duration-700 ease-out ${show ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
                <MainTitle />
                <div className="w-fit mt-35 border-2 rounded-lg mx-auto bg-black/20 shadow-[var(--shadow)]">
                    <div className="p-2 flex gap-5 items-center">
                        <Image
                            loading="eager"
                            src="/question-mark-vector-icon.jpg"
                            width={300}
                            height={300}
                            alt="Player avatar"
                            style={{ height: "100px", width: "100px", boxShadow: "var(--shadow)", borderRadius: "7px" }}
                        />
                        <div>
                            <p className="text-center text-lg">{player.first_login ? "Welcome" : "Welcome back"}, {titleCase(player.name)}!</p>
                            <p className="text-center text-sm">Last visit {player.last_seen ? microsecondDateToString(player.last_seen) : ""}</p>
                        </div>
                    </div>
                    <div className="flex justify-center m-5">
                        <button onClick={() => setShowNewGame(!showNewGame)} className="rounded-lg bg-green-600 px-1 shadow-[var(--shadow)]">New Game</button>
                    </div>
                    <div className={`${showNewGame ? "h-50 opacity-100" : "h-0 opacity-0"} overflow-hidden transition-all duration-300`}>
                        <NewGame player={player} setNewGameReq={setNewGameReq} />
                    </div>
                    <Lobby newRoom={newRoom} setNewRoom={setNewRoom} setMsg={setMsg} joinLobby={joinLobby} player={player} deleteRoom={deleteRoom} />
                </div>
            </div>
        </div>
    )
}