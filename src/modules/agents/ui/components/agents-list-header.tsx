"use client"
/*The parent has use client or the component itself has the use client  other when this component is used
in server compotent it will become the server component
either you in agent page you can use client then all the part will become client or you can use {children}
 only that will become client component*/

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
    const [isDialogueOpen, setIsDialogueOpen] = useState(false);
    return (
        <>
            <NewAgentDialog open = {isDialogueOpen} onOpenChange={setIsDialogueOpen} />
                <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="font-medium text-xl">My Agents</h5>
                        <Button onClick = {() => setIsDialogueOpen(true)}>
                            <PlusIcon/> New Agent
                        </Button>
                    </div>
                </div>
        </>
    )
}