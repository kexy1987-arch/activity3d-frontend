import { useGLTF, useAnimations } from "@react-three/drei"
import { JSX, useRef } from "react"
import { SkeletonUtils } from "three/examples/jsm/Addons.js"
import { useMemo, useEffect } from "react"
import * as THREE from "three";
import { Group } from "three/examples/jsm/libs/tween.module.js";
import { group } from "console";
import { useFrame } from "@react-three/fiber";

type PrimitiveProps = Omit<JSX.IntrinsicElements['primitive'], 'object'>


export function Man({ animation = "Idle", color, ...props }: PrimitiveProps & { animation?: string, color?: string }) {
    const { scene, animations } = useGLTF('/models/man.glb')
    const groupRef = useRef<Group>(null);
    const cloned = useMemo(() => {
        const c = SkeletonUtils.clone(scene);
        if(color){
            c.traverse(obj => {
                if (obj instanceof THREE.Mesh) {

                    if (obj.name === "Casual2_Body_1") {
                        if (Array.isArray(obj.material)) {
                            obj.material = obj.material.map(m => {
                                if ("color" in m) {
                                    const clonedMat = m.clone();
                                    clonedMat.color.set(color);
                                }
                                return m
                            })
                        } else if ("color" in obj.material) {
                            const clonedMat = obj.material.clone();
                            clonedMat.color.set(color);
                            obj.material = clonedMat;
                        }
                    }
                }
            })
        }
        
        return c;

    }, [scene, color])
    
    const { actions } = useAnimations(animations, cloned);

    useEffect(() => {
        Object.values(actions).forEach(a => a!.stop())

        const action = actions[`CharacterArmature|${animation}`]
        if (action) {
            action.reset().fadeIn(0.3).play()
        }

    }, [animation])

    useFrame((_, delta)=> {
        if(!groupRef.current) return;
        
    })

    return (
        <group ref={groupRef}>
            <primitive object={cloned} {...props} />
        </group>
        )
}

export function Woman({ animation = "Idle", color, ...props }: PrimitiveProps & { animation?: string, color?: string }) {
    const { scene, animations } = useGLTF('/models/woman.glb')
    const cloned = useMemo(() => {
        const c = SkeletonUtils.clone(scene);
        if (color) {
            c.traverse(obj => {
                if (obj instanceof THREE.Mesh) {

                    if (obj.name === "Casual2_Body_1") {
                        if (Array.isArray(obj.material)) {
                            obj.material = obj.material.map(m => {
                                if ("color" in m) {
                                    const clonedMat = m.clone();
                                    clonedMat.color.set(color);
                                }
                                return m
                            })
                        } else if ("color" in obj.material) {
                            const clonedMat = obj.material.clone();
                            clonedMat.color.set(color);
                            obj.material = clonedMat;
                        }
                    }
                }
            })
        }

        return c;

    }, [scene, color])

    const { actions } = useAnimations(animations, cloned);

    useEffect(() => {
        Object.values(actions).forEach(a => a!.stop())

        const action = actions[`CharacterArmature|${animation}`]
        if (action) {
            action.reset().fadeIn(0.3).play()
        }

    }, [animation])

    return <primitive object={cloned} {...props} />
}

export function Grass(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/grass.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function TallGrass(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tall_grass.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function GrassPatch(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/grass_patch.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function FlowerGroup(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/flower_group.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Bush(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/flowers_bush.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Pine(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/pine.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree1(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree1.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree2(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree2.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree6(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree6.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Plant(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/plant.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Rocks(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/rocks.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function RockMed(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/rock_med.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function RockMed2(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/rock_med2.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function RockPathRound(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/rock_path_round.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function RockPathSmall(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/rock_path_small.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

