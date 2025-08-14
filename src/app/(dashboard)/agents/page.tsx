import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";

const Page = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session){
      redirect("/sign-in");
    }
  // the above will make sure you dod login before getting the access to the it will redirect to login if we are not login
  const queryClient = getQueryClient();
  // server components to prefetch the agents get many
  // as you can see in below we are begineeing to import the 
  // the page is not protected so unauthorized users can actually see the space if compy oage link and alogout
  // you can still access the page so we are changing the procesure to protected procedure 

  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
  <>
  <AgentsListHeader/>
  <HydrationBoundary state = {dehydrate(queryClient)}>
    <Suspense fallback={<AgentsViewLoading/>}>
    <ErrorBoundary fallback = {<AgentsViewError/>}>
      <AgentsView />
    </ErrorBoundary>
    </Suspense>
  </HydrationBoundary>
  </>
  //
  // The fiest component that will be loaded will be the page component in agents page it will get the hydrate
  // through hydration boundry then the react query the react query and the tanstack react query cache
  // noe go to agents view

  // we already have the native next js boundry of error why used a file and class because only for component error
  // next ja entire page error 
  

  )


}

export default Page;