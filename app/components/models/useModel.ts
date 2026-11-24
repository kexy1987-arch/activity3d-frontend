import { Mesh, SkinnedMesh, Object3D } from "three"
import { useGLTF } from "@react-three/drei"
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"

function collectMeshes(obj: Object3D, out: Mesh[] = []) {
    if (obj instanceof Mesh || obj instanceof SkinnedMesh) out.push(obj)
    obj.children.forEach(child => collectMeshes(child, out))
    return out
}

export function useModel(url: string) {
    const gltf = useGLTF(url)

    const meshes = collectMeshes(gltf.scene)
    if (meshes.length === 0) throw new Error(`Model ${url} has no meshes`)

    const geometries = meshes.map(mesh => {
        const geo = mesh.geometry.clone()
        geo.applyMatrix4(mesh.matrixWorld)
        return geo
    })

    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries)
    const material = meshes[0].material

    return { geometry: mergedGeometry, material }
}


