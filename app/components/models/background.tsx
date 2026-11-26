import { useTexture } from "@react-three/drei";

type Props = {
    position: [number, number, number];
    rotation: [number, number, number];
    surface: string,
    width: number;
    heigth: number
}

export default function Background({position, rotation, surface, width, heigth}: Props){
     const texture = useTexture(surface);

    return(
        <mesh
            rotation={[-Math.PI / rotation[0], rotation[1], rotation[2]]}
            position={position}
        >
            <planeGeometry args={[width, heigth]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}