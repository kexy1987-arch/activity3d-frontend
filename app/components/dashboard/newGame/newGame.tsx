"use client"

import type { Player, RoomCreateRequest } from "@/lib/types"
import { useRef } from "react"

type Props = {
    player: Player;
    setNewGameReq: (val: RoomCreateRequest) => void;
}

export default function NewGame({player, setNewGameReq}: Props){
    const nameRef = useRef<HTMLInputElement>(null);

    function newRoomReq(){
        if(nameRef && nameRef.current && nameRef.current.value){
            const room = {
                name: nameRef.current.value,
                creator: player
            }

            setNewGameReq(room);
        }
        
    }

    return(
        <div className="bg-white/70 text-black rounded-lg p-3 m-2 space-y-5">
            <h2 className="text-center">New Game</h2>
            <div className="grid grid-cols-2">
                <label>Enter Room Name:</label>
                <input ref={nameRef} type="text" className="border rounded px-2"/>
            </div>
            <div className="flex justify-center">
                <button onClick={() => newRoomReq()} className="border rounded-3xl px-3 py-1">Create</button>
            </div>
            
        </div>
    )
}