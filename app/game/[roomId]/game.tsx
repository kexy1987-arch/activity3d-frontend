import { Player, Room } from "@/lib/types"

type Props = {
    room: Room,
    player: Player
}

export default function Game({room, player}: Props){

    return(
        <div>
            <h1>Game</h1>
        </div>
    )
}