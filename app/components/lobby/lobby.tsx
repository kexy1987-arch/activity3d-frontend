"use client"

import { GameRespond, Player, Room } from "@/lib/types"
import { useEffect, useState } from "react"
import { titleCase } from "@/lib/helpers"
import { useRouter } from "next/navigation"

type Props = {
    newRoom?: Room | null;
    joinLobby: (room_id: string, player: Player) => Promise<GameRespond>;
    deleteRoom: (room_id: string) => Promise<boolean>;
    player: Player;
    setNewRoom: (val: Room | null) => void;
    setMsg: (msg: string) => void;
}

export default function Lobby({newRoom, setNewRoom, setMsg, joinLobby, player, deleteRoom}: Props){
    const [rooms, setRooms] = useState<Room[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws/rooms");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WS JSON:", data)
            setRooms(data);
            console.log(data)
            
        };

        return () => ws.close();
    }, []);

    async function join(room_id: string, player: Player){
        const joined = await joinLobby(room_id, player)
        if(joined.room){
            console.log("joined: ", joined);
            router.push(`/room/${joined.room.id}?playerId=${player.id}`);
            return;
        }
        if(joined.message === `${player.name} is already in the lobby`){
            router.push(`/room/${room_id}?playerId=${player.id}`);
            return;
        }

        if (joined.message === `${player.name} is already in the team`){
            router.push(`/room/${room_id}?playerId=${player.id}`);
            return;
        }

        setMsg(joined.message)
        console.log("joined: ", joined)
    }

    async function delRoom(room_id: string) {
        const deleted = await deleteRoom(room_id);
        
        if(deleted){
            setNewRoom(null);
            console.log("Deleted:", deleted);
            return;
        }

        console.log("Deleted:", deleted);
    }

    return(
        <div className="bg-black/40">
            <h3 className="text-center text-lg border">Available Rooms</h3>
            {newRoom && <div className="grid grid-cols-3 mx-auto w-full border-b p-2">
                <h3 className="text-lg">Your Room:</h3>
                <div className="flex flex-col">
                    <span>{newRoom.name}</span>
                    <span>State: {titleCase(newRoom.state)}</span>
                    <span>Lobby: {newRoom.lobby.length} players</span>
                </div>
                <div className="flex flex-col gap-3 items-center justify-evenly">
                    <button onClick={() => join(newRoom.id, player)} className="w-[70%] border px-2 rounded-3xl shadow-[var(--shadow)] bg-green-300/70">Join</button>
                    <button onClick={() => delRoom(newRoom.id)} className="w-[70%] border px-2 rounded-3xl shadow-[var(--shadow)] bg-red-300/70">Delete</button>
                </div>
            </div>}
            <div>
                <h3 className="border-b text-center text-lg">All Rooms:</h3>
                <div className="p-2 max-h-[600px] overflow-y-scroll space-y-2">
                    {rooms && rooms.length > 0 && rooms.map(room => (
                        <div key={room.id} className="grid grid-cols-2 gap-1 text-center bg-yellow-100/80 text-green-700 font-bold p-1 rounded">
                            <span ><strong>Room name:</strong> {room.name}</span>
                            <span>State: {titleCase(room.state)}</span>
                            <span>Players in: {Object.keys(room.ready_players).length} {room.lobby.length > 1 ? "Players" : "Player"}</span>
                            <button onClick={() => join(room.id, player)} className="border px-2 rounded-3xl shadow-[var(--shadow)]">{Object.keys(room.ready_players).includes(player.id!) ? "Return" : "Join"}</button>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}