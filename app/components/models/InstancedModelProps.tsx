import { Instances, Instance } from "@react-three/drei"
import { useModel } from "./useModel"
import { WallProps } from "@/lib/types"

type Props = {
    props: WallProps[],
    url: string
}

export function InstancedModelProps({ props, url }: Props) {
    const { geometry, material } = useModel(url)

    return (
        <Instances geometry={geometry} material={material} limit={props.length}>
            {props.map((prop, i) => (
                <Instance
                    key={i}
                    position={prop.pos}
                    rotation={[0, Math.PI / 6.3, 0]}
                />
            ))}
        </Instances>
    )
}