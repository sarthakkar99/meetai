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
    // use suspense query very fast if you want to use the above in the parent component we are getting the proper 
    // xrefeteching and the proper boundry
    // we pass null there seems to be an issue with protected routes this will happen when you pass stringify null in 
    // in use suspense query it changes to query
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