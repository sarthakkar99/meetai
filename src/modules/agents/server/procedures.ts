// import { db } from "@/db";
// import { agents } from "@/db/schema";
// import { eq } from "drizzle-orm";

// import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
// import { agentInsertSchema } from "../schema";
// // import { TRPCError } from "@trpc/server";
// export const agentsRouter = createTRPCRouter({
//     // The getone proceduew is defined because when the user is going to take on the individual agent
//     // They have to define the getone add the agent because they have to fetch that individual agent
//     getOne: baseProcedure.input(z.object({id: z:string()})).query(async ({ input }) => {
//         const [existingAgent] = await db
//         .select()
//         .from(agents)
//         .where(eq(agents.id, input.id));
//         // The above picks the agent if already present already prsent directs them

//         // throw new TRPCError({code: "BAD_REQUEST"}); 

//         return data;
//     }),
//     //  Change getMany yo use protected procesdure
//     getMany: baseProcedure.query(async () => {
//         const data = await db
//         .select()
//         .from(agents);
//         // await new Promise((resolve) => setTimeout(resolve, 2000));

//         // throw new TRPCError({code: "BAD_REQUEST"}); 

//         return data;
//     }),
//     // Next js offers a native error bounddry the same way the offer a loading boundry so defined error .tsx in agents/page.tsx
    
//     create: protectedProcedure.input(agentInsertSchema).mutation(async ({input, ctx}) => {
//         // const {name, instructions} = input;
//         // // auth holds the user information and context  of infor we are doing detructive inilialization
//         // const { auth } = ctx;
//         const [createdAgent] = await db.insert(agents).values({...input, userId: ctx.auth.user.id}).returning();
//         return createdAgent;
//         // In the above we have automcatically provided the checks and balances the user will cause the protected proce
//         // dure to fail if we dont have value and without user id the above command will force it to fail
//     })
// })

import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";

export const agentsRouter = createTRPCRouter({
  // Fetch a single agent by id (no auth requirement if it's public; otherwise switch to protectedProcedure)
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent ?? null;
    }),

  // List current user's agents
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));
    return data;
  }),

  // Create an agent for the current user
  create: protectedProcedure
    .input(agentInsertSchema) // expects { name, instructions }
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();
      return createdAgent;
    }),
});
