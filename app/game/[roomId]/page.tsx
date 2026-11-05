import { Room } from "@/lib/types";
import Game from "./game";

type Props = {
    params: {
        roomId: string,
    };
    searchParams: {
        playerId: string
    }
}

export default async function Page({ params, searchParams }: Props) {
    const backendUrl = process.env.BACKEND_URL
    const { roomId } = await params
    const { playerId } = await searchParams

    const roomReq = await fetch(`${backendUrl}/rooms/${roomId}`);
    const room = await roomReq.json() as Room;
    const playerReq = await fetch(`${backendUrl}/players/${playerId}`);
    const player = await playerReq.json();



    return <Game room={room} player={player}/>
}