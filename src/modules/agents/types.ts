import { inferRouterOutputs } from '@/modules/agwnts/server/procedures';

import type { AppRouter } from "@/trpc/routers/_app"
// we infer the types of data here
// the app router nunder trpc so the app router has access to all agents router
// the app router pases the context and target the agents thats the procedure
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
// see the issue we can sk why cant we directly take from the data yes thats true but the issue is we can control 
// schema should be returned cbasically contril


