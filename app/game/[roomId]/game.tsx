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
    }), true, 15, 1.5);

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

    const tree1 = [
        { pos: [-3, 2.6, -46], scale: 2 },
        { pos: [-12, 2.6, -37], scale: 2 },
        { pos: [-4, 2.6, -22], scale: 2 },
        { pos: [-16, 2.6, -16], scale: 2 },
        { pos: [-18, 2.6, -31], scale: 2 },
        { pos: [-9, 2.6, -5], scale: 2 },
        { pos: [-3, 2.6, 2], scale: 2 },
        { pos: [-12, 2.6, 10], scale: 2 },
        { pos: [-4, 2.6, 22], scale: 2 },
        { pos: [-16, 2.6, 16], scale: 2 },
        { pos: [-18, 2.6, 31], scale: 2 },
        { pos: [-9, 2.6, 43], scale: 2 },
        { pos: [-15, 2.6, 0], scale: 2 },
    ]

    const tree2 = [
        { pos: [-10, 0, -47], scale: 1 },
        { pos: [-13, 0, -40], scale: 1 },
        { pos: [-8, 0, -31], scale: 1 },
        { pos: [-18, 0, -24], scale: 1 },
        { pos: [-9, 0, -17], scale: 1 },
        { pos: [-11, 0, -10], scale: 1 },
        { pos: [-15, 0, -3], scale: 1 },
        { pos: [-18, 0, 1], scale: 1 },
        { pos: [-7, 0, 8], scale: 1 },
        { pos: [-4, 0, 14], scale: 1 },
        { pos: [-14, 0, 21], scale: 1 },
        { pos: [-17, 0, 27], scale: 1 },
        { pos: [-15, 0, 33], scale: 1 },
        { pos: [-18, 0, 38], scale: 1 },
        { pos: [-13, 0, 45], scale: 1 },
    ]

    const tree6 = [
        { pos: [-3, 2.9, 49], scale: 2 },
        { pos: [-4, 2.9, 37], scale: 2 },
        { pos: [-9, 2.9, 31], scale: 2 },
        { pos: [-9, 2.9, 20], scale: 2 },
        { pos: [-5, 2.9, -8], scale: 2 },
        { pos: [-3, 2.9, -16], scale: 2 },
        { pos: [-10, 2.9, -25], scale: 2 },
        { pos: [-4, 2.9, -33], scale: 2 },
    ]

    const rocks = [
        { pos: [-2, 0, -38], scale: 1 , rotation: [0, 0, 0]},
        { pos: [-4, 0, -25], scale: 1, rotation: [0, 0, 0] },
        { pos: [-3, 0, -4], scale: 1, rotation: [0, 0, 0] },
        { pos: [-6, 0, 10], scale: 1, rotation: [0, 0, 0] },
        { pos: [-4, 0, 24], scale: 1, rotation: [0, 0, 0] },
        { pos: [-3, 0, 40], scale: 1, rotation: [0, 0, 0] },
    ]

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
                                key={"grassPatch2" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    {grassPatch3.map(el => (
                        el.map((pos, i) => (
                            <Models.GrassPatch
                                key={"grassPatch3" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    {grassPatch4.map(el => (
                        el.map((pos, i) => (
                            <Models.GrassPatch
                                key={"grassPatch4" + i}
                                position={pos}
                                rotation={[0, Math.PI / 6.3, 0]}
                            />
                        ))
                    ))}
                    {tree1.map((props, i) => (
                        <Models.Tree1
                            key={"tree1" + i}
                            position={props.pos}
                            rotation={[0, Math.PI / 6.3, 0]}
                            scale={props.scale}
                        />
                    ))}
                    {tree2.map((props, i) => (
                        <Models.Tree2
                            key={"tree2" + i}
                            position={props.pos}
                            rotation={[0, Math.PI / 6.3, 0]}
                            scale={props.scale}
                        />
                    ))}
                    {tree6.map((props, i) => (
                        <Models.Tree6
                            key={"tree6" + i}
                            position={props.pos}
                            rotation={[0, Math.PI / 6.3, 0]}
                            scale={props.scale}
                        />
                    ))}
                    {rocks.map((props, i) => (
                        <Models.RockMed
                            key={"rocks" + i}
                            position={props.pos}
                            rotation={[0, Math.PI / 6.3, 0]}
                            scale={props.scale}
                        />
                    ))}
                    <Models.Man position={[0, 0, -47]} />                
                    <OrbitControls />       
                </Canvas>
            </div>
        </div>
    )
}