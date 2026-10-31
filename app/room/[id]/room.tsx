"use client"

import { GameRespond, Player, Room, TeamReq } from "@/lib/types"
import Image from "next/image";
import { titleCase } from "@/lib/helpers";
import { useEffect, useState } from "react";
import NewTeam from "@/app/components/newTeam/newTeam";

type Props = {
    room: Room;
    player: Player;
    creator: string;
    createTeam: (team: TeamReq) => Promise<GameRespond>;
    joinTeam: (player: Player, roomId: string, teamId: string) => Promise<GameRespond>;
}

export default function GameRoom({room, player, creator, createTeam, joinTeam}: Props){
    const [currRoom, setCurrRoom] = useState<Room>(room);
    const [showNewTeam, setShowNowTeam] = useState<boolean>(false);

    useEffect(() => {
            const ws = new WebSocket(`ws://localhost:8000/ws/rooms/${room.id}`);
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("WS JSON:", data)
                setCurrRoom(data.room);
                if(data.event){
                    console.log(data.event);
                }
            };
    
            return () => ws.close();
        }, []);

    return(
        <div className="space-y-15">
            <div className="text-center text-xl max-w-full pt-3">
                <h1>Room name: <strong className="text-green-800">{room.name}</strong></h1>
                <h2>Dear <span className="text-blue-800">{player.name}</span>, welcome in <span className="text-red-500">{creator}'s</span> room.</h2>
            </div>
            <div className="flex flex-col items-center space-y-5">
                <div className="flex flex-wrap w-full">
                    {currRoom.lobby.length > 0 && currRoom.lobby.map(player => (
                        <div key={player.id} className="flex flex-col items-center w-20 mx-2 shadow-[var(--shadow)] rounded bg-black/30 overflow-hidden">
                            <Image
                                src={player.avatar_url ? player.avatar_url : "/question-mark-vector-icon.jpg"}
                                alt="Avatar"
                                width={100}
                                height={100}
                            />
                            <strong>{titleCase(player.name)}</strong>
                        </div>
                    ))}
                </div>
                <div className="space-x-2">
                    <button onClick={() => setShowNowTeam(!showNewTeam)} className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">New Team</button>
                    <button className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">Ready</button>
                    <button className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">Leave Room</button>
                    <div className="relative w-26">
                        <div className="absolute top-[-3rem] right-[-12rem]">
                            {showNewTeam && <NewTeam createTeam={createTeam} player={player} teams={currRoom.teams} setShowNewTeam={setShowNowTeam} />}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 border rounded p-3 bg-green-400/80 shadow-[var(--shadow)] text-green-900">
                    {currRoom.teams.length > 0 &&
                    currRoom.teams.map(team => (
                        <div key={team.id} className="border rounded p-1 flex flex-col items-center gap-2 m-[2px]">
                            <h3 className="px-1 font-bold text-black rounded" style={{backgroundColor: team.color}}>{team.name} / {titleCase(team.color)}</h3>
                            {team.players.length > 0 && team.players.map((player, i) => (
                                <div key={player.id! + i} className="text-black">
                                    <div className="grid grid-cols-2 p-1">
                                        <p>{player.name}:</p><p>{team.ready ? "Ready" : "Waiting"}</p>
                                    </div>
                                    <div className="w-fit mx-auto">
                                        <button className="shadow-[var(--shadow-sm)] bg-red-500 text-white rounded-2xl px-1 font-bold">Kick</button>
                                    </div>                                    
                                    <hr className="mt-2"></hr>
                                </div>
                            ))}
                            <button onClick={() => joinTeam(player, currRoom.id, team.id!)} className="bg-blue-500 px-2 rounded-2xl shadow-[var(--shadow-sm)]">Join</button>
                        </div>
                    ))
                    }
                </div>                
            </div>            
        </div>
    )
}