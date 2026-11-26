export type Account = {
    email: string,
    password: string
}

export type Player = {
    id?: string;
    name: string;
    is_guest: boolean;
    auth_id?: string;
    avatar_url?: string;
    created_at?: string;
    last_seen?: string;
    room_id?: string;
    first_login?: boolean;
}

export type CreatePlayerReq = {
    player: Player;
    account: Account
}

export type SignInReq = {
    email: string;
    password: string
}

export type RoomCreateRequest = {
    name: string;
    creator: Player
}

export type Room = {
        id: string;
        created_at: string;
        name: string;
        creator_id: string;
        state: string;
        teams: Team[];
        lobby: Player[];
        countdown_running: boolean;
        countdown_seconds: number;
        ready_players: Record<string, boolean>;
}

export type RoomRes = {
    message: string;
    room: Room;
}

export type Team = {
    id?: string;
    name?: string;
    color: string;
    players: Player[];
    ready: boolean;
    position: [number, number, number];
}

export type GameRespond = {
    message: string;
    room: Room;
    ready_players?: Record<string, boolean>;
    player?: Player;
}

export type TeamReq = {
    color: string;
    player: Player;
    ready: boolean
}

export type RoomMsg = {
    player_name: string;
    message: string;
    avatar_url?: string
}

export type PathPos = { 
    start: number, 
    start1: number, 
    start2: number, 
    step: number, 
    step1: number, 
    step2: number, 
    length: number,
    counter?: number
}

export type WallProps = {
    pos: [number, number, number],
    scale: number,
    rotation: [number, number, number]
}

export type CharacterProps = {
    gender: "man" | "woman";
    position: React.RefObject<[number, number, number]>;
    animation?: string;
    color?: string;
}