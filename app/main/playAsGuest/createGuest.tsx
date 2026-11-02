"use client"

import { Player } from "@/lib/types"
import { useRef } from "react"
import { useRouter } from "next/navigation";

type Props = {
    createPlayer: (player: Player) => Player
}

export default function CreateGuest({createPlayer}: Props){
    const tagRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function handlePlay(){
        const tag = tagRef.current;
        if(tag){
            const name = tag.value;
            const player = {
                name: name,
                is_guest: true,
                auth_id: "",
                avatar_url: "",
                room_id: "",
                first_login: true
            }

            const playerReq = await createPlayer(player);
            const playerRes = await playerReq;
            router.push(`/dashboard/${playerRes.id}`);
        }
    }

    return(
        <div className="flex flex-col items-center gap-[10vh] p-10">
            <h1 className="text-3xl [text-shadow:2px_2px_5px_black]">Play as guest</h1>
            <div className="flex flex-col gap-3 bg-blue-300 text-black p-5 rounded-xl shadow-[var(--shadow)] w-fit m-auto items-center">
                <label className="font-bold [text-shadow:2px_2px_5px_rgba(0,0,0,0.673)]">Enter Gamer Tag</label>
                <input ref={tagRef} type="text" className="border rounded-2xl px-2 text-center shadow-[var(--shadow)]"/>
                <button onClick={() => handlePlay()} className="border bg-green-200 rounded-2xl px-2 text-center shadow-[var(--shadow-sm)]">Play</button>
            </div>
        </div>
        
    )
}