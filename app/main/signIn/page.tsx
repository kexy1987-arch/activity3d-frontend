import { SignInReq } from "@/lib/types";
import SignIn from "./signIn";
import { redirect } from "next/navigation";
import ErrorModal from "@/app/components/error/error";

export default async function Page(){
    async function signIn(req: SignInReq){
        "use server"
        const loginReq = await fetch(`${process.env.BACKEND_URL}/players/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(req)
        })

        if (loginReq.ok){
            const loginRes = await loginReq.json();

            if (loginRes.player_id) {
                const id = loginRes.player_id;
                redirect(`/dashboard/${id}`)
            }
        } else {
            return (
                <div>
                    HI
                    <ErrorModal msg="Incorrect email or password." />
                </div>
            )
        }        
    }
    return <SignIn signIn={signIn} />
}