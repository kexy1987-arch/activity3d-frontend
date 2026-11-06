"use client"

import { Player, Room } from "@/lib/types"
import { Canvas } from "@react-three/fiber"
import * as Models from "@/app/components/models/models"
import { OrbitControls, Grid, Environment } from "@react-three/drei"
import { pathPos, pathPosRepeater } from "@/lib/helpers"


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
    
    const grassPatch = pathPosRepeater(pathPos({
        start: -1.5,
        start1: 0,
        start2: -55,
        step: 0,
        step1: 0,
        step2: 1.5,
        length: 74
    }), true, -19, 1.5);

    const grassPatch2 = pathPosRepeater(pathPos({
        start: 5,
        start1: 0,
        start2: -55,
        step: 0,
        step1: 0,
        step2: 1.5,
        length: 74
    }), true, 19, 1.5);

    const grassPatch3 = pathPosRepeater(pathPos({
        start: 0.5,
        start1: 0,
        start2: -55,
        step: 0,
        step1: 0,
        step2: 1.5,
        length: 5
    }), true, 4, 1.5);

    const grassPatch4 = pathPosRepeater(pathPos({
        start: 0.5,
        start1: 0,
        start2: 47,
        step: 0,
        step1: 0,
        step2: 1.5,
        length: 6
    }), true, 4, 1.5);

    

    return(
        <div className="border bg-blue-300">
            <h1>Game</h1>
            <div className="h-[600px]">
                <Canvas camera={{position: [1, 5, 47], fov: 10}}>
                    <Environment preset="park" />
                    <directionalLight position={[0, 0, -5]} />
                    <Grid infiniteGrid />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[40, 112]} />
                        <meshStandardMaterial color="green" />
                    </mesh>
                    {paths.map(el => (
                        el.map((pos, i) => (
                            <Models.RockPathRound 
                                key={"path" + i} 
                                position={pos} 
                             />
                        ))
                        
                    ))}                   
                    {grassPatch.map(el => (
                        el.map((pos, i) => (
                               <Models.GrassPatch 
                                    key={"grassPatch" + i} 
                                    position={pos}
                                    rotation={[0, Math.PI /6.3, 0]}
                                />
                        ))
                    ))}
                    {grassPatch2.map(el => (
                        el.map((pos, i) => (
                            <Models.GrassPatch
                                key={"grassPatch" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    {grassPatch3.map(el => (
                        el.map((pos, i) => (
                            <Models.GrassPatch
                                key={"grassPatch" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    {grassPatch4.map(el => (
                        el.map((pos, i) => (
                            <Models.GrassPatch
                                key={"grassPatch" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    <Models.Man position={[0, 0, -47]} />                
                    <OrbitControls />       
                </Canvas>
            </div>
        </div>
    )
}