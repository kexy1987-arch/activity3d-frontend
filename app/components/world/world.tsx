import { memo } from "react";
import { pathPos, randomPathFlat } from "@/lib/helpers"
import { InstancedModel } from "@/app/components/models/InstancedModel"
import { InstancedMultiMesh } from "@/app/components/models/instanedMultiMeash"
import Tile from "../models/tile";
import Background from "../models/background";

const paths = pathPos({
    start: 0,
    start1: 0.1,
    start2: -47,
    step: 0,
    step1: 0,
    step2: 1.9,
    length: 50
});

const grassPositions = [
    ...randomPathFlat({ x: -9.5, y: 0, z: -30 }, 17, 120, 1).flat().map(p => p.pos),
    ...randomPathFlat({ x: 2, y: 0, z: -30 }, 17, 120, 1).flat().map(p => p.pos),
    ...randomPathFlat({ x: -1, y: 0, z: -30 }, 5, 10, 1).flat().map(p => p.pos),
    ...randomPathFlat({ x: -1, y: 0, z: 25 }, 5, 10, 1).flat().map(p => p.pos),
]

const rocksPositions = randomPathFlat({ x: -11.5, y: 0, z: -25 }, 11, 93, 11)
const rock2Positions = randomPathFlat({ x: -15, y: 0, z: -25 }, 14, 100, 13)
const treePosition = randomPathFlat({ x: -10.5, y: 0, z: -25 }, 14, 100, 10)
const tree2Positions = randomPathFlat({ x: -10.5, y: 0, z: -25 }, 14, 100, 10)
const tree6Positions = randomPathFlat({ x: -10.5, y: 0, z: -25 }, 14, 100, 10)

function world(){
   

    return(
        <>
            <Background surface={"/gamebg.png"} width={240} heigth={50} position={[-20, 10, 0]} rotation={[2, 1, 1.5]} />
            {
                paths.map((p, i) => {                    
                    if(i % 4 === 0){
                        return (
                            <Tile key={"path" + i} surface={"/tileImgs/dblueR.jpg"} position={p} />
                        )
                    }
                    if (i % 4 === 1) {
                        return (
                            <Tile key={"path" + i} surface={"/tileImgs/greenR.jpg"} position={p} />
                        )
                    }
                    if (i % 4 === 2) {
                        return (
                            <Tile key={"path" + i} surface={"/tileImgs/orangeR.jpg"} position={p} />
                        )
                    }
                    if (i % 4 === 3) {
                        return (
                            <Tile key={"path" + i} surface={"/tileImgs/lblueR.jpg"} position={p} />
                        )
                    }
                })
            }
            <InstancedModel positions={grassPositions} url={"/models/grass_patch.glb"} />
            {rocksPositions.map((rock, i) => (
                <InstancedMultiMesh key={i} items={rock} url={"/models/rock_med2.glb"} />
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
            
        </>
    )
}

  

const World = memo(world)

export default World;