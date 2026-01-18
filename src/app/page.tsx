"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {

  const {data: session} = authClient.useSession() 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async() => {
    await authClient.signUp.email({
      email,
      name,
      password
    },{
      onRequest: () => {
        window.alert("Creating user...")
      },
      onSuccess: () => {
        window.alert("User created successfully!")
      },
      onError: () => {
        window.alert("Error creating user")
      }
    })
  }

  const onLogin = async() => {
    await authClient.signIn.email({
      email,
      password
    },{
      onRequest: () => {
        window.alert("Logging in user...")
      },
      onSuccess: () => {
        window.alert("User logged in successfully!")
      },
      onError: () => {
        window.alert("Error logging in user")
      }
    })
  }

  if(session){
    return <div>
    <div>Welcome, {session.user.name}</div>
    <Button onClick={()=>authClient.signOut()}>Logout</Button>
    </div>
  }

  return (
    <div>
      <div className="flex flex-col border-4 gap-y-4">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="flex flex-col border-4 gap-y-4">
        {/* <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/> */}
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  )
}
