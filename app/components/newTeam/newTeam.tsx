"use client"

import { GameRespond, Player, Team, TeamReq } from "@/lib/types"
import { useState, useEffect } from "react";

type Props = {
    createTeam: (team: TeamReq) => Promise<GameRespond>;
    setShowNewTeam: (val: boolean) => void;
    player: Player;
    teams: Team[];
}

export default function NewTeam({createTeam, setShowNewTeam, player, teams}: Props){
    const [colors, setColors] = useState<string[]>(["red", "green", "blue", "yellow"]);

    async function handleCreateTeam(color: string){
        if( color === "") return;
        const updateReq = await createTeam({
            color: color,
            player: player,
            ready: false
        })
        
        setShowNewTeam(false);
    }

    useEffect(() => {
        function updateColors(teams: Team[]){
            const usedColors = teams.map(t => t.color);
            const newColors = colors.filter(c => !usedColors.includes(c));
            setColors(newColors);
        }
        
        updateColors(teams);
    }, [teams])

    return(
        <div className="flex items-center gap-1 w-50 m-5 shadow-[var(--shadow)] rounded-2xl px-2 bg-blue-300 text-green-800">
            <label>Choose Your Team's color</label>
            <select className="bg-black/30 w-fit border rounded px-1 m-1" onChange={(e) => handleCreateTeam(e.target.value)}>
                <option value=""></option>
                {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>
        </div>
    )
}