import { Mesh, SkinnedMesh, Object3D } from "three"
import { useGLTF } from "@react-three/drei"

function collectMeshes(obj: Object3D, out: Mesh[] = []) {
    if (obj instanceof Mesh || obj instanceof SkinnedMesh) out.push(obj)
    obj.children.forEach(child => collectMeshes(child, out))
    return out
}

export function useMeshes(url: string) {
    const gltf = useGLTF(url)
    const meshes = collectMeshes(gltf.scene)

    if (meshes.length === 0) throw new Error(`Model ${url} has no meshes`)

    return meshes.map(mesh => ({
        geometry: mesh.geometry,
        material: mesh.material
    }))
}
