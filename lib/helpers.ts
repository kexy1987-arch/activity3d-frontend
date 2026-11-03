import { Team } from "./types";

export function titleCase(str: string): string {
    if(!str) return "";
    const splitted = str.split(" ");
    const titleCaseArray = splitted.map(str => str[0].toUpperCase() + str.slice(1));

    return titleCaseArray.join(" ");
}

export function microsecondDateToString(dateStr: string): string{
    const fixed = dateStr.replace(/\.\d+/, "");
    const date = new Date(fixed);
    return date.getHours() + ":" + date.getMinutes() + " " + date.toLocaleDateString();
    }

export function teamReadyCheck(team: Team, readyPlayers: Record<string, boolean>): boolean{
    const readies = [];
        for(const player of team.players){            
            readies.push(readyPlayers[player.id!]);
        }  
        
        console.log("READIES: ", readies)
    
    const res = readies.every(v => v === true);

    return res;
}