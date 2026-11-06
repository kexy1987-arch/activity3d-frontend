import { Team, PathPos } from "./types";

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

export function pathPos({ start, start1, start2, step, step1, step2, length, counter = 0 }: PathPos): [number, number, number][] {
    if (counter >= length) return [];
    const positions: [number, number, number][] = [];
    positions.push([Number(start.toFixed(1)), Number(start1.toFixed(1)), Number(start2.toFixed(1))]);
    return [
        ...positions,
        ...pathPos({
            start: start + step,
            start1: start1 + step1,
            start2: start2 + step2,
            step,
            step1,
            step2,
            length,
            counter: counter + 1
        })
    ];
}

export function pathPosRepeater(pathPos: [number, number, number][], xOrY: boolean, amount: number, step = 1 ): [number, number, number][][]{
    const multiplied: [number, number, number][][] = [];
    const target = amount > 0 ? step : step * -1;

    for(let i = 0; Math.abs(i) < Math.abs(amount); i += target){
        const updated = pathPos.map(pos => {
            const newPos: [number, number, number] = [...pos];
            newPos[xOrY ? 0 : 2] = Number((pos[xOrY ? 0 : 2] + i).toFixed(1))
            return newPos;
        }            
        );
        multiplied.push(updated)
    }
    return multiplied
}