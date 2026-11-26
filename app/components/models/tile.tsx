import { useTexture } from "@react-three/drei";

type Props = {
    surface: string;
    position: [number, number, number]
}

export default function Tile({surface, position}: Props) {
    const texture = useTexture(surface);

    return (
        <>
            <mesh
                rotation={[-Math.PI / 2, 0, 1.58]}
                position={position}
            >
                <planeGeometry args={[1.9, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, 1.58]}
                position={[position[0] + 1, position[1], position[2]]}
            >
                <planeGeometry args={[1.9, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, 1.58]}
                position={[position[0] + 2, position[1], position[2]]}
            >
                <planeGeometry args={[1.9, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, 1.58]}
                position={[position[0] + 3, position[1], position[2]]}
            >
                <planeGeometry args={[1.9, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </>
    );
}