"use client"

import { useState, useEffect } from "react";
import MainTitle from "./components/mainTitle/mainTitle";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const router = useRouter()

  function leavePage(target: string) {
    setShow(false);
    setTimeout(() => {
      router.push(target);
    }, 1100)
  }

  function setShow(val: boolean) {
    setShowTitle(val)
    setTimeout(() => {
      setShowButtons(val)
    }, 500)
    setTimeout(() => {
      setShowLink(val)
    }, 800)
  }

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="pt-10">
      <div className={`
          transition-all duration-700 ease-out
          ${showTitle ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}
        `}
      >
        <MainTitle />
      </div>
      <div className="absolute top-[80%] left-[50%] translate-[-50%] w-100 space-y-10">
        <div className={`
          w-fit mx-auto
          transition-all duration-700 ease-out
          ${showButtons ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}
        `}>
          <button onClick={() => leavePage("/main/signIn")} className="mx-3 shadow-[var(--shadow)]
            px-6 py-3 bg-violet-600 text-white font-medium rounded-lg
            transform transition-transform duration-300
            hover:scale-105
          ">
            Sign in
          </button>
          <button onClick={() => leavePage("/main/playAsGuest")} className="mx-3 shadow-[var(--shadow)]
            px-6 py-3 bg-violet-600 text-white font-medium rounded-lg
            transform transition-transform duration-300
            hover:scale-105
          ">
              Play as guest
          </button>
        </div>
        <div className={`
          w-fit mx-auto
          transition-all duration-700 ease-out
          ${showLink ? "translate-x-0 opacity-100" : "-translate-x-[-3rem] opacity-0"}
        `}>
          <button onClick={() => leavePage("/main/createAccount")} className="bg-[rgba(20,20,20,0.72)] px-3 py-1 rounded-lg shadow-[var(--shadow)]">Create Account</button>
        </div>
      </div>
    </div>
  );
}
