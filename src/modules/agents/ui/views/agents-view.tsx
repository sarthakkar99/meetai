"use client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";

import { LoadingState } from "@/components/loading-state";

export const AgentsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    
    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
    // coming from agents page
    // when the agents view is there we already have the data inside reducing the load time 

    // when we useQuery we dont have the data defined but when we have the useSuspenseQuery we already have resolve the date
    // because use Suspense query fetch the data inside of it therefore remove isLoading and 

}

export const AgentsViewLoading = () => {
    return (
        <LoadingState title = "Loading Agents" description="This May take few SSeconds"/>

    )
}
export const AgentsViewError = () => {
    return (
        <ErrorState title="Error Loading Agents" description="Something Went Wrong"/>
    )
}