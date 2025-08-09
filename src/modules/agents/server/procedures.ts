import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";
export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db
        .select()
        .from(agents);
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // throw new TRPCError({code: "BAD_REQUEST"}); 

        return data;
    }),
    // Next js offers a native error bounddry the same way the offer a loading boundry so defined error .tsx in agents/page.tsx
     
})