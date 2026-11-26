import { Man, Woman } from "@/app/components/models/models"
import { CharacterProps } from "@/lib/types"


export function Character({ gender, position, animation = "Idle", color }: CharacterProps) {

    if (gender === "man") {
        return <Man position={position} animation={animation} color={color} />
    }

    return <Woman position={position} animation={animation} color={color}/>
}
