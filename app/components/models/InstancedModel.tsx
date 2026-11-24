import { Instances, Instance } from "@react-three/drei"
import { useModel } from "./useModel"

type Props = {
    positions: [number, number, number][],
    url: string
}

export function InstancedModel({ positions, url }: Props) {
    const { geometry, material } = useModel(url)

    return (
        <Instances geometry={geometry} material={material} limit={positions.length}>
            {positions.map((pos, i) => (
                <Instance
                    key={i}
                    position={pos}
                    rotation={[0, Math.PI / 6.3, 0]}
                />
            ))}
        </Instances>
    )
}
