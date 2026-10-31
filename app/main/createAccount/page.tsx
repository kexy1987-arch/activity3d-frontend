import CreateAccount from "./createAccount"
import type { CreatePlayerReq } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Page(){
    async function saveAccount(playerReq: CreatePlayerReq){
        "use server"
        const newAccountReq = await fetch(`${process.env.BACKEND_URL}/players/create-player`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(playerReq)
        })

        const newAccountRes = await newAccountReq.json();
        if(newAccountRes.name === playerReq.player.name){
            redirect("/");
        } else {
            console.error(String(newAccountRes));
            throw Error("Account_create_error");
        }
        
    }

    return(
        <CreateAccount saveAccount={saveAccount}/>
    )
}