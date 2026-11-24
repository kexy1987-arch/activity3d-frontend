import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { easing } from "maath"
import { useRef } from "react"


type Rig = {
    position: [number, number, number]
}

export function CameraRig({position}: Rig) {
    const characterPos = useRef(new Vector3());
    const desiredPos = useRef(new Vector3());
    const offSet =  useRef(new Vector3(3, 2, 0));
    const lookAtPos = useRef(new Vector3());

    useFrame((state, delta) => {

        if(!position) return; 
        characterPos.current.set(...position);
        desiredPos.current.copy(characterPos.current).add(offSet.current);

        easing.damp3(
            state.camera.position, 
            desiredPos.current, 
            5, 
            delta);

        easing.damp3(
            lookAtPos.current,
            characterPos.current,
            0.05,
            delta
        )
        
        state.camera.lookAt(lookAtPos.current);
    })

    return null
}
