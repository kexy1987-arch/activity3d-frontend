"use client"

import { Player, Room } from "@/lib/types"
import { Canvas } from "@react-three/fiber"
import { Grid, Environment } from "@react-three/drei"
import { pathPos, pathPosRepeater, randomPathTilted, randomPathFlat } from "@/lib/helpers"
import { InstancedModel } from "@/app/components/models/InstancedModel"
import { InstancedMultiMesh } from "@/app/components/models/instanedMultiMeash"
import { useState, useMemo, useEffect } from "react"
import { Character } from "@/app/components/models/character"
import { CharacterProps } from "@/lib/types"
import { CameraRig } from "./cameraFollow"



type Props = {
    room: Room,
    player: Player
}


export default function Game({room, player}: Props){

    const paths = pathPosRepeater(pathPos({
        start: 0,
        start1: 0.1,
        start2: -47,
        step: 0,
        step1: 0,
        step2: 1.9,
        length: 50
    }), true, 4,);

    const grassPositions = useMemo(() => [
        ...randomPathFlat({ x: -9.5, y: 0, z: -30 }, 17, 120, 1).flat().map(p => p.pos),
        ...randomPathFlat({ x: 2, y: 0, z: -30 }, 17, 120, 1).flat().map(p => p.pos),
        ...randomPathFlat({ x: -1, y: 0, z: -30 }, 5, 10, 1).flat().map(p => p.pos),
        ...randomPathFlat({ x: -1, y: 0, z: 25 }, 5, 10, 1).flat().map(p => p.pos),
    ], [])

    const rocksPositions = useMemo(() => randomPathFlat({ x: -11.5, y: 0, z: -25 }, 11, 93, 11), [])
    const rock2Positions = useMemo(() => randomPathFlat({ x: -15, y: 0, z: -25 }, 14, 100, 13), [])
    const treePosition = useMemo(() => randomPathFlat({ x: -10.5, y: 0, z: -25 }, 17, 100, 10), [])
    const tree2Positions = useMemo(() => randomPathFlat({ x: -10.5, y: 0, z: -25 }, 17, 100, 10), [])
    const tree6Positions = useMemo(() => randomPathFlat({ x: -10.5, y: 0, z: -25 }, 17, 100, 10), [])
    const tiltedRocksPositions = useMemo(() => randomPathTilted({ x: -18, y: 4, z: -30 }, 15, 120, 1), [])
    const tiltedRocksPositions2 = useMemo(() => randomPathTilted({ x: -20, y: 4, z: -30 }, 15, 120, 1), [])
    const tiltedTreePositions = useMemo(() => randomPathTilted({ x: -17, y: 3, z: -30, scale: 1, rotate: false }, 12, 120, 4), [])
    const tiltedTreePositions2 = useMemo(() => randomPathTilted({ x: -18, y: 5, z: -30, scale: 0.6, rotate: false }, 12, 120, 7), [])



    const [team1, setTeam1] = useState<CharacterProps>({position: [0, 0, 20], animation: "Idle", gender: "man"});
    const [team2, setTeam2] = useState<CharacterProps>({position: [1, 0, -47], animation: "Idle", gender: "man"});
    const [team3, setTeam3] = useState<CharacterProps>({position: [2, 0, -47], animation: "Idle", gender: "man"});
    const [team4, setTeam4] = useState<CharacterProps>({position: [3, 0, -47], animation: "Idle", gender: "man"});
    const [selectedCharacterId, setSelectedCharacterId] = useState(1);
    const selectedCharacter = 
        selectedCharacterId === 1 ? team1 :
        selectedCharacterId === 2 ? team2 :
        selectedCharacterId === 3 ? team3 :
        team4;
    

    return(
        <div className="border bg-blue-300">
            <h1>Game</h1>
            <div className="h-[300px]">
                <Canvas>
                    <CameraRig position={selectedCharacter.position}/>
                    <Environment preset="forest" />
                    <directionalLight position={[0, 0, -5]} />
                    <Grid infiniteGrid />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[40, 112]} />
                        <meshStandardMaterial color="green" />
                    </mesh>
                    {paths.map((p, i) => (
                        <InstancedModel key={"path" + i} positions={p} url={"/models/rock_path_round.glb"}/>
                    ))}
                    <InstancedModel positions={grassPositions} url={"/models/grass_patch.glb"}/>
                    {rocksPositions.map((rock, i) => (
                        <InstancedMultiMesh key={i} items={rock} url={"/models/rock_med2.glb"}/>
                    ))}
                    {rock2Positions.map((rock, i) => (
                        <InstancedMultiMesh key={i} items={rock} url={"/models/rock_med2.glb"} />
                    ))}
                    {treePosition.map((tree, i) => (
                        <InstancedMultiMesh key={i} items={tree} url={"/models/tree1.glb"} />
                    ))}
                    {tree2Positions.map((tree, i) => (
                        <InstancedMultiMesh key={i} items={tree} url={"/models/tree2.glb"} />
                    ))}
                    {tree6Positions.map((tree, i) => (
                        <InstancedMultiMesh key={i} items={tree} url={"/models/tree6.glb"} />
                    ))}
                    {tiltedRocksPositions.map((rocks, i) => (
                        <InstancedMultiMesh key={i} items={rocks} url={"/models/rock_med2.glb"} />
                    ))}
                    {tiltedRocksPositions2.map((rocks, i) => (
                        <InstancedMultiMesh key={i} items={rocks} url={"/models/rock_med2.glb"} />
                    ))}
                    {tiltedTreePositions.map((rocks, i) => (
                        <InstancedMultiMesh key={i} items={rocks} url={"/models/tree1.glb"} />
                    ))}
                    {tiltedTreePositions2.map((rocks, i) => (
                        <InstancedMultiMesh key={i} items={rocks} url={"/models/tree2.glb"} />
                    ))}
                    <Character position={team1.position} animation={team1.animation} gender={team1.gender} color={"red"}/>
                    <Character position={team2.position} animation={team2.animation} gender={team2.gender} color={"green"}/>
                    <Character position={team3.position} animation={team3.animation} gender={team3.gender} color={"blue"}/>
                    <Character position={team4.position} animation={team4.animation} gender={team4.gender} color={"yellow"}/>  
                </Canvas>
                <button className="bg-black p-2" onClick={() => setTeam1(prev => ({
                    ...prev,
                    position: [selectedCharacter.position[0], selectedCharacter.position[1], selectedCharacter.position[2] + 1]
                }))}>{"<="}</button>
                <button className="bg-black p-2" onClick={() => setTeam1(prev => ({
                    ...prev,
                    position: [selectedCharacter.position[0], selectedCharacter.position[1], selectedCharacter.position[2] - 1]
                }))}>{"=>"}</button>
                <button className="bg-black p-2" onClick={() => setTeam1(prev => ({
                    ...prev,
                    animation: "Walk"
                }))}>walk</button>
                <button className="bg-black p-2" onClick={() => setTeam1(prev => ({
                    ...prev,
                    animation: "Idle"
                }))}>idle</button>
            </div>
        </div>
    )
}