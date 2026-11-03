import { GameRespond, Player } from "@/lib/types"

type Props = {
    player: Player,
    playerUpdate: (formData: FormData) => Promise<GameRespond>;
    setPlayer: (player: Player) => void;
    setMsg: (msg: string) => void;
}

export default function Settings({player, playerUpdate, setPlayer, setMsg}: Props){

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        form.append("player_id", player.id!)
        const updated = await playerUpdate(form);
        if(updated.player && updated.message === "Updated"){
            setPlayer(updated.player);
            setMsg(updated.message);
            return
        }
        setMsg(updated.message);
    }

    return(
        <div className="border p-7 bg-black/70 rounded-xl shadow-[var(--shadow)] w-90 space-y-4">
            <h2 className="text-center text-2xl text-blue-300">Settings</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="space-y-2 text-green-300">
                    <div className="grid grid-cols-2">
                        <label>Name:</label>
                        <input type="text" name="name" placeholder={player.name} className="border rounded-2xl text-center text-black bg-white/80" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <label className="font-bold">Profile Picture</label>
                        <div className="w-fit m-auto">
                            <input
                                name="avatar_file"
                                id="fileInput"
                                type="file"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById("fileInput")?.click()}
                                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Choose File
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto w-fit">
                        <button type="submit" className="px-2 bg-red-400 text-white text-2xl font-bold rounded">Submit</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}