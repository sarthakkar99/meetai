"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
export default function Home() {
  const { data: session } = authClient.useSession() 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    authClient.signUp.email({
      email, 
      password,
      name,
    }, {
      onError: () => { window.alert("Something Went Wrong");}
    , 
    onSucess : () => { window.alert("Success");}
  });
  }
  const onLogin = () => {
    authClient.signIn.email({
      email, 
      password
    }, {
      onError: () => { window.alert("Something Went Wrong");}
    , 
    onSucess : () => { window.alert("Success");}
  });
  }
  if (session)
  {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder = "name" value = {name} onChange={(e) => setName(e.target.value)}/>
        <Input placeholder = "email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder = "password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder = "email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder = "password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}
