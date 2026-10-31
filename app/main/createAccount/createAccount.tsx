"use client"

import { CreatePlayerReq } from "@/lib/types"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Props = {
    saveAccount: (val : CreatePlayerReq) => void
}

export default function CreateAccount({saveAccount}: Props){

    const [showForm, setShowForm] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [playerReq, setPlayerReq] = useState<CreatePlayerReq>({
        player: {
            name: "",
            is_guest: false
        },
        account: {
            email: "",
            password: ""
        }
        
    })
    const router = useRouter();

    function onInputChange(group: "player" | "account", key:string, val: string){
        setPlayerReq(prev => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: val
            }
            
        }))
    }

    function leavePage(target: string){
        setShow(false);
        setTimeout(() => {
            router.push(target);
        }, 1100)
    }

    function setShow(val: boolean){
        setShowTitle(val)
        setTimeout(() => {
            setShowForm(val)
        }, 500)
        setTimeout(() => {
            setShowButtons(val)
        }, 800)
    }

    function onFormSubmit(e: React.SubmitEvent<HTMLFormElement>, playerReq: CreatePlayerReq){
        e.preventDefault();
        saveAccount(playerReq);
    }

    useEffect(() => {
        setShow(true)
    }, [])

    return(
        <div className="p-5 space-y-10">
            <h1 className={`
                text-center text-4xl text-yellow-300 font-bold
                transition-all duration-700 ease-out
                ${showTitle ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}
                `}>Create account</h1>
            <form onSubmit={(e) => onFormSubmit(e, playerReq)} className="space-y-10">
                <div className={`bg-orange-400/60 p-8 rounded-lg space-y-5 shadow-[var(--shadow)] text-black
                w-fit mx-auto
                transition-all duration-700 ease-out
                ${showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}
                `}>
                    <div className="grid grid-cols-2">
                        <label>Email:</label>
                        <input type="email" value={playerReq.account.email} onChange={(e) => onInputChange("account", "email", e.target.value)} className="border rounded-2xl px-2 bg-white" />
                    </div>
                    <div className="grid grid-cols-2">
                        <label>Password</label>
                        <input type="password" value={playerReq.account.password} onChange={(e) => onInputChange("account", "password", e.target.value)} className="border rounded-2xl px-2 bg-white" />
                    </div>
                    <div className="grid grid-cols-2">
                        <label>Player name <br></br>(in game)</label>
                        <input type="text" value={playerReq.player.name} onChange={(e) => onInputChange("player", "name", e.target.value)} className="border rounded-2xl px-2 bg-white" />
                    </div>
                </div>                
                <div className={`
                  w-fit mx-auto
                  transition-all duration-700 ease-out
                  ${showButtons ? "translate-x-0 opacity-100" : "-translate-x-[-3rem] opacity-0"}
                `}>
                    <button type="submit" className="mx-3 shadow-[var(--shadow)]
                        px-6 py-3 bg-violet-600 text-white font-medium rounded-lg
                        transform transition-transform duration-300
                        hover:scale-105
                    ">
                        Sign up
                    </button>
                    <button type="button" onClick={() => leavePage("/")} className="mx-3 shadow-[var(--shadow)]
                        px-6 py-3 bg-violet-600 text-white font-medium rounded-lg
                        transform transition-transform duration-300
                        hover:scale-105
                    ">
                        Back
                    </button>
                </div>
            </form>
            
        </div>
    )
}