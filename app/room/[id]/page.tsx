"use server"

import { GameRespond, Player, Room, RoomMsg, TeamReq } from "@/lib/types";
import GameRoom from "./room"
import ErrorModal from "@/app/components/error/error";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingPage from "./loading";

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

    const messages = await getMessages(room_id);

    if(!player){
        return(<ErrorModal msg="Player not in the room."/>)
    };

    player.room_id = id;

    async function createTeam(team: TeamReq): Promise<GameRespond>{
        "use server"
        const teamReq = await fetch(`${backendUrl}/teams/${room_id}/create_team?color=${team.color}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        });

        const teamRes = await teamReq.json();
        return teamRes;
    }

    async function joinTeam(player: Player, roomId: string, teamId: string) {
        "use server"
        const joinReq = await fetch(`${backendUrl}/teams/${roomId}/${teamId}/join`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        });

        const joinRes = await joinReq.json();
        return joinRes;
    }

    async function leaveRoom(roomId: string, player: Player){
        "use server"
        const leaveReq = await fetch(`${backendUrl}/lobby/${roomId}/leave`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        });

        const leaveRes = await leaveReq.json();
        if (leaveRes.event === "leave"){
            redirect(`/dashboard/${player.id}`)
        }
        return leaveRes;
    }

    async function playerReady(playerId: string, roomId: string, ready: boolean, ){
        "use server"
        const readyReq = await fetch(`${backendUrl}/players/${roomId}/${playerId}/ready?value=${ready}`, {
            method: "POST",
        });

        const readyRes = await readyReq.json();
        return readyRes;
    }

    async function kickPlayer(roomId: string, playerId: string){
        "use server"
        const kickReq = await fetch(`${backendUrl}/lobby/${roomId}/kick/${playerId}`, {
            method: "POST"
        })

        const kickRes = await kickReq.json();
        return kickRes
    }

    async function teamReady(roomId: string, teamId: string, value: boolean){
        "use server"

        const teamReadyReq = await fetch(`${backendUrl}/teams/${roomId}/${teamId}/ready?value=${value}`, {
            method: "POST",
        })

        const teamReadyRes = await teamReadyReq.json()
        return teamReadyRes
    }

    async function getMessages(roomId: string): Promise<RoomMsg[]> {
        const messagesReq = await fetch(`${backendUrl}/rooms/messages/${roomId}`)
        const messagesRes = await messagesReq.json();

        if(messagesRes.ok){
            return messagesRes.messages;
        }

        console.log(messagesRes.error);
        return [];        
    }

    async function sendMessage(roomId: string, msg:RoomMsg): Promise<GameRespond>{
        "use server"
        const sendReq = await fetch(`${backendUrl}/rooms/message/${roomId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(msg)
        })

        const sendRes = await sendReq.json()
        return sendRes;
    }

    return(
        <Suspense fallback={<LoadingPage/>}>
            <GameRoom
                room={room}
                player={player}
                creator={creator.name}
                createTeam={createTeam}
                joinTeam={joinTeam}
                playerReady={playerReady}
                leaveRoom={leaveRoom}
                kickPlayer={kickPlayer}
                teamReady={teamReady}
                messages={messages}
                sendMessage={sendMessage}
            />
        </Suspense>
        
    )
}