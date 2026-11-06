import { useGLTF } from "@react-three/drei"
import { JSX } from "react"
import { SkeletonUtils } from "three/examples/jsm/Addons.js"
import { useMemo } from "react"

type PrimitiveProps = Omit<JSX.IntrinsicElements['primitive'], 'object'>

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

export function Tree3(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree3.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree4(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree4.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree5(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree5.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Tree6(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/tree6.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Man(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/man.glb')
    const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])
    return <primitive object={cloned} {...props} />
}

export function Women(props: PrimitiveProps) {
    const { scene } = useGLTF('/models/women.glb')
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

