import { LoadingState } from "@/components/loading-state";
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";

const Page = async () => {
  const queryClient = getQueryClient();
  // server components to prefetch the agents get many
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
  <HydrationBoundary state = {dehydrate(queryClient)}>
    <Suspense fallback={<AgentsViewLoading/>}>
    <ErrorBoundary fallback = {<AgentsViewError/>}>
      <AgentsView />
    </ErrorBoundary>
    </Suspense>
  </HydrationBoundary>
  //
  // The fiest component that will be loaded will be the page component in agents page it will get the hydrate
  // through hydration boundry then the react query the react query and the tanstack react query cache
  // noe go to agents view
  

  )


}

export default Page;