"use server"

import { GameRespond, Player, Room, TeamReq } from "@/lib/types";
import GameRoom from "./room"
import ErrorModal from "@/app/components/error/error";

type Props = {
    params: {
        id: string,
    };
    searchParams: {
        playerId: string
    }
}

export default async function Page({params, searchParams}: Props){
    const {id} = await params
    const {playerId} = await searchParams

    const room_id = id;
    const backendUrl = process.env.BACKEND_URL;

    const roomReq = await fetch(`${backendUrl}/rooms/${room_id}`);
    const room = await roomReq.json() as Room;

    const playerReq = await fetch(`${backendUrl}/players/${playerId}`);
    const player = await playerReq.json();
    const creatorReq = await fetch(`${backendUrl}/players/${room.creator_id}`);
    const creator = await creatorReq.json();

    if(!player){
        return(<ErrorModal msg="Player not in the room."/>)
    }

    player.room_id = id;

    async function createTeam(team: TeamReq): Promise<GameRespond>{
        "use server"
        const teamReq = await fetch(`${backendUrl}/teams/${room_id}/create_team?color=${team.color}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        })
        const teamRes = await teamReq.json();
        return teamRes;
    }

    async function joinTeam(player: Player, roomId: string, teamId: string) {
        "use server"
        console.log("ROOMID: ", roomId)
        const joinReq = await fetch(`${backendUrl}/teams/${roomId}/${teamId}/join`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        })

        const joinRes = await joinReq.json();
        return joinRes;
    }

    return(
        <GameRoom room={room} player={player} creator={creator.name} createTeam={createTeam} joinTeam={joinTeam}/>
    )
}