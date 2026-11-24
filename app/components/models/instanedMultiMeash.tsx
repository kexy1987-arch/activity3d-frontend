import { Instances, Instance } from "@react-three/drei"
import { useMeshes } from "./useMeshes"

type Item = {
    pos: [number, number, number]
    rotation: [number, number, number]
    scale?: number
}

type Props = {
    url: string
    items: Item[]
}

export function InstancedMultiMesh({ url, items }: Props) {
    const meshes = useMeshes(url)

    return (
        <>
            {meshes.map((mesh, i) => {
                return(
                <Instances
                    key={i}
                    geometry={mesh.geometry}
                    material={mesh.material}
                    limit={items.length}
                >
                    {items.map((item, j) => (
                        <Instance
                            key={j}
                            position={item.pos}
                            rotation={item.rotation}
                            scale={item.scale}
                        />
                    ))}
                </Instances>
            )})}
        </>
    )
}
