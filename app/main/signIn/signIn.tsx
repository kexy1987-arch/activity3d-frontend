"use client"

import { SignInReq } from "@/lib/types"
import { useState, useEffect } from "react"

type Props = {
    signIn: (val: SignInReq) => void,
}

export default function SignIn({signIn}: Props){
    const [req, setReq] = useState<SignInReq>({
        email: "",
        password: ""
    })
    const [show, setShow] = useState(false);

    function onInputChange(key: string, value: string){
        setReq(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function onSubmit(e: React.SubmitEvent<HTMLFormElement>, req: SignInReq){
        e.preventDefault();
        setShow(false);
        setTimeout(() => signIn(req), 1300)
        
    }

    useEffect(() => setShow(true), [])

    return(
        <div className="space-y-30 p-5">
            <h1 className={`
                  w-fit mx-auto
                  text-center text-4xl
                  p-2
                  transition-all duration-700 ease-out
                  bg-green-900/50 rounded-lg overflow-hidden space-y-5 shadow-[var(--shadow)]
                  ${show ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
                `}>Sign In</h1>
            <form onSubmit={(e) => onSubmit(e, req)} 
                className={`
                  w-fit mx-auto
                  transition-all duration-700 ease-out
                  bg-green-900/50 rounded-lg overflow-hidden space-y-5 shadow-[var(--shadow)]
                  ${show ? "translate-x-0 opacity-100" : "-translate-x-[-3rem] opacity-0"}
                `}>
                <div className="space-y-5 px-3 pt-5">
                    <div className="grid grid-cols-2">
                        <label>Email:</label>
                        <input type="email" value={req.email} onChange={(e) => onInputChange("email", e.target.value)} className="rounded-3xl border px-3 bg-white text-center"/>
                    </div>
                    <div className="grid grid-cols-2">
                        <label>Password:</label>
                        <input type="password" value={req.password} onChange={(e) => onInputChange("password", e.target.value)} className="rounded-3xl border px-3 bg-white text-center" />
                    </div>
                </div>
                <div className="grid grid-cols-2 h-8">
                    <button className="bg-blue-700" type="submit">Sign in</button>
                    <button className="bg-red-800" type="button">Back</button>
                </div>
            </form>
        </div>
    )
}