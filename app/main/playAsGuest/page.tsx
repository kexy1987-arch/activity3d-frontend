import { Player } from "@/lib/types";
import CreateGuest from "./createGuest";

export default async function Page(){
    
    async function createPlayer(player: Player){
        "use server"
        const playerReq = await fetch(`${process.env.BACKEND_URL}/players/create-guest`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        })

        const playerRes = await playerReq.json();
        return playerRes;
    }

    return <CreateGuest createPlayer={createPlayer}/>
}