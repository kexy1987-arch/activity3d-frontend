"use server"

import { GameRespond, Player, RoomCreateRequest, RoomRes } from "@/lib/types"
import Dashboard from "./dashboard"
import ErrorModal from "@/app/components/error/error"


type Props = {
    params: { id: string }
}

export default async function Page({params}: Props){
    const {id} = await params
    const backendUrl = process.env.BACKEND_URL

    async function createRoom(room: RoomCreateRequest): Promise<RoomRes>{
        "use server"
        const createReq = await fetch(`${backendUrl}/rooms/create`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(room)
        })

        const createRes = await createReq.json();
        return createRes;
    }

    async function deleteRoom(room_id: string): Promise<boolean>{
        "use server"
            const deleteing = await fetch(`${backendUrl}/rooms/${room_id}`,{
                method: "DELETE",
                body: room_id
            });

            const deleted = await deleteing.json();
            return deleted;
    }

    async function joinLobby(room_id: string, player: Player): Promise<GameRespond>{
        "use server"
            const join = await fetch(`${backendUrl}/lobby/${room_id}/join`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(player)
            });

            const joined = await join.json()
            return joined;
    }
    
    const playerReq = await fetch(`${process.env.BACKEND_URL}/players/${id}`);
    const player = await playerReq.json()

    if(player.detail){
        const msg = player.detail
        return <ErrorModal msg={msg}/>
    }

    return (
                <Dashboard player={player} createRoom={createRoom} deleteRoom={deleteRoom} joinLobby={joinLobby}/>
    )
}