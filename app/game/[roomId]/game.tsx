"use client"

import { Player, Room } from "@/lib/types"
import { Canvas } from "@react-three/fiber"
import { Grid, Environment, Sky } from "@react-three/drei"
import { Character } from "@/app/components/models/character"
import { CameraRig } from "./cameraFollow"
import World from "@/app/components/world/world"
import Tile from "@/app/components/models/tile"
import { useEffect, useRef } from "react"


type Props = {
    room: Room,
    player: Player
}



export default function Game({room, player}: Props){
    const team1Pos = useRef<[number, number, number]>([0, 0, 0]);
    const team2Pos = useRef<[number, number, number]>([0, 0, 0]);
    const team3Pos = useRef<[number, number, number]>([0, 0, 0]);
    const team4Pos = useRef<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        function setTeams(){
            const teams = room.teams;
            if (teams[0]) team1Pos.current = teams[0].position;
            if (teams[1]) team2Pos.current = teams[1].position;
            if (teams[2]) team3Pos.current = teams[2].position;
            if (teams[3]) team4Pos.current = teams[3].position;
        }

        setTeams();
    }, [])

    return(
        <div className="border bg-blue-300 h-full">
            <h1>Game</h1>
            <button onClick={() => {
                if (!team1Pos) return;
                team1Pos.current = [team1Pos.current[0], team1Pos.current[1], team1Pos.current[2] + 1.9]
            }}>MOVE</button>
            <div className="h-full">
                <Canvas>
                    <CameraRig position={team1Pos}/>
                    <Sky 
                        distance={450000}
                        sunPosition={[30, 20, 0]}
                        inclination={1}
                        azimuth={2}
                    />
                    <Environment preset="city" />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[40, 112]} />
                        <meshStandardMaterial color="green" />
                    </mesh>
                    <Tile surface={"/tileImgs/dblueR.jpg"} position={[0, 0, -47]} />
                    <World />
                    {room.teams[0] && <Character position={team1Pos} animation={"Idle"} gender={"man"} color={"red"} />}
                    {room.teams[1] && <Character position={team2Pos} animation={"Idle"} gender={"man"} color={"green"} />}
                    {room.teams[2] && <Character position={team3Pos} animation={"Idle"} gender={"man"} color={"blue"} />}
                    {room.teams[3] && <Character position={team4Pos} animation={"Idle"} gender={"man"} color={"yellow"} />}
                   
                </Canvas>
            </div>
        </div>
    )
}