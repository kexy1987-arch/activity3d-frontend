"use client"

import { GameRespond, Player, Room, TeamReq } from "@/lib/types"
import Image from "next/image";
import { titleCase, teamReadyCheck } from "@/lib/helpers";
import { useEffect, useState, useRef } from "react";
import NewTeam from "@/app/components/newTeam/newTeam";
import { useRouter } from "next/navigation";
import Countdown from "@/app/components/countdown/countdown";
import ErrorModal from "@/app/components/error/error";
import MsgBar from "@/app/components/msgBar/msgBar";

type Props = {
    room: Room;
    player: Player;
    creator: string;
    createTeam: (team: TeamReq) => Promise<GameRespond>;
    joinTeam: (player: Player, roomId: string, teamId: string) => Promise<GameRespond>;
    playerReady: (playerId: string, roomId: string, ready: boolean) => Promise<GameRespond>;
    leaveRoom: (roomId: string, player: Player) => Promise<GameRespond>;
    kickPlayer: (roomId: string, playerId: string) => Promise<GameRespond>;
    teamReady: (roomId: string, teamId: string, value: boolean) => Promise<GameRespond>;
}

export default function GameRoom({room, player, creator, createTeam, joinTeam, playerReady, leaveRoom, kickPlayer, teamReady}: Props){
    const [currRoom, setCurrRoom] = useState<Room>(room);
    const [showNewTeam, setShowNowTeam] = useState<boolean>(false);
    const router = useRouter()
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdownValue, setCountdownValue] = useState(6);
    const playerCardRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
            const main = mainRef.current;
            main?.classList.remove("flip-out");
            main?.classList.add("flip-in");
            const ws = new WebSocket(`ws://localhost:8000/ws/rooms/${currRoom.id}`);
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("WS JSON:", data)
                if(data) {    
                    if(data.message){
                        setMsg(data.message);
                    }           
                    if(data.event){
                        console.log(data.event);
                    }
                    if (data.event === "player_kicked"){
                        if(data.player_id === player.id){
                            router.push(`/dashboard/${player.id}`);
                        }
                    }
                    if(data.room){
                        const updatedRoom: Room = data.room;
                        setCurrRoom(updatedRoom);
                    }
                  if(data.event === "countdown_started"){
                      setCountdownValue(data.seconds)
                      setShowCountdown(true);
                      
                  }
                  if(data.event === "countdown_tick"){
                      setCountdownValue(prev => prev - data.value);
                  }
                 if (data.event === "game_started") {
                     router.push(`/game`)
                 } 
                  if (data.event === "countdown_stopped"){
                      setShowCountdown(false);
                  }
                }
            };
    
            return () => ws.close();
        }, []);

    function join(teamId: string){
        const playerCard = playerCardRef.current;        
        if(playerCard){
            playerCard.classList.add("shrunk");
            playerCard.addEventListener("transitionend", () => {
                joinTeam(player, currRoom.id, teamId);
            }, { once: true });
        } else {
            joinTeam(player, currRoom.id, teamId);
        }
        
    }

    function leave(){
        const main = mainRef.current;
        if(main){
            main.classList.remove("flip-in");
            main.classList.add("flip-out");
            main.addEventListener("animationend", () => {            
                leaveRoom(currRoom.id, player);
            }, { once: true });
        }
        
    }    

    function ready(teamId: string, value: boolean, playerId: string){
        playerReady(playerId, currRoom.id, !currRoom.ready_players[playerId]);
        teamReady(currRoom.id, teamId, value);
    }

    if (!player) {
        return <ErrorModal msg="Player not found" />
    }



    return(
        <div>
            <MsgBar msg={msg} setMsg={setMsg} />
            <div ref={mainRef} className="space-y-15 translate-all flip-in p-2">
                
                <div className="text-center text-xl max-w-full pt-3">
                    <h1>Room name: <strong className="text-green-800">{currRoom.name}</strong></h1>
                    <h2>Dear <span className="text-blue-800">{player.name}</span>, welcome in <span className="text-red-500">{creator}'s</span> room.</h2>
                </div>
                {showCountdown && <div className="w-full h-15 absolute top-20 left-[50%] translate-x-[-50%]">
                    <Countdown countdownValue={countdownValue} />
                </div>}
                <div className="flex flex-col items-center space-y-5">
                    <div className="flex flex-wrap w-full">
                        {currRoom.lobby.length > 0 && currRoom.lobby.map(newplayer => (
                            <div ref={newplayer && player.id === newplayer.id ? playerCardRef : null} key={newplayer.id} className="flex flex-col items-center w-20 mx-2 shadow-[var(--shadow)] rounded bg-black/30 overflow-hidden shrink">
                                <Image
                                    src={newplayer.avatar_url ? newplayer.avatar_url : "/question-mark-vector-icon.jpg"}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                />
                                <strong>{titleCase(newplayer.name)}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="space-x-2">
                        <button onClick={() => setShowNowTeam(!showNewTeam)} className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">New Team</button>
                        <button onClick={() => leave()} className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">Leave Room</button>
                        <div className="relative w-26">
                            <div className="absolute top-[-3rem] right-[-12rem]">
                                {showNewTeam && <NewTeam createTeam={createTeam} player={player} teams={currRoom.teams} setShowNewTeam={setShowNowTeam} />}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border rounded p-3 bg-green-400/80 shadow-[var(--shadow)] text-green-900">
                        {currRoom.teams.length > 0 &&
                            currRoom.teams.map(team => {

                                return (
                                    <div key={team.id} className="border rounded p-1 flex flex-col items-center gap-2 m-[2px]">
                                        <div className=" font-bold text-black rounded border overflow-hidden" style={{ backgroundColor: team.color }}>
                                            <div className="p-1">
                                                <h3>{team.name} {titleCase(team.color)}</h3>
                                            </div>
                                            <span className={`${team.ready ? "bg-green-500" : "bg-red-400"} flex justify-center text-sm w-full font-normal`}>
                                                {team.ready ? "Ready" : "Not Ready"}
                                            </span>
                                        </div>
                                        {team.players.length > 0 && team.players.map((tplayer, i) => (
                                            <div key={tplayer.id! + i} className="text-black">
                                                <div className="grid grid-cols-2 p-1">
                                                    <p>{tplayer.name}:</p><p>{currRoom.ready_players[tplayer.id!] ? "Ready" : "Waiting"}</p>
                                                </div>
                                                <div className="w-fit mx-auto">
                                                    {tplayer.id === player.id && <button onClick={() => ready(team.id!, teamReadyCheck(team, currRoom.ready_players), tplayer.id!)
                                                    } className="shadow-[var(--shadow)] bg-black/30 rounded-2xl px-3 py-2 font-bold">{currRoom.ready_players[player.id!] ? "Ready" : "Not Ready"}</button>}
                                                    {tplayer.id !== player.id && <button onClick={() => kickPlayer(room.id, tplayer.id!)} className="shadow-[var(--shadow-sm)] bg-red-500 text-white rounded-2xl px-1 font-bold">Kick</button>}
                                                </div>
                                                <hr className="mt-2"></hr>
                                            </div>
                                        ))}
                                        <button onClick={() => join(team.id!)} className="bg-blue-500 px-2 rounded-2xl shadow-[var(--shadow-sm)]">Join</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}