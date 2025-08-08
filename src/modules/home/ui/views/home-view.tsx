// "use client";
// import { Button } from '@/components/ui/button';
// import { authClient } from '@/lib/auth-client';
// import React from 'react'

// export default function HomeView = () => {
//   const {data: session} = authClient.useSession();
//   if (!session){
//     return (
//       <p>Loading....</p>
//     )
//   }
//   return (
//     <div className='flex flex-col p-4 gap-y-4'>
//       <p>Logged in as {session.user.name}</p>
//       <Button onClick = {() => authClient.signOut()}>
//         Sign Out
//       </Button>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { authClient } from '@/lib/auth-client';
// import { useRouter } from 'next/navigation';

// export default function HomeView() {
//   const { data: session } = authClient.useSession();
//   const router = useRouter();
//   if (!session) return <p>Loading...</p>;

//   return (
//     <div className="flex flex-col p-4 gap-y-4">
//       <p>Logged in as {session.user?.name ?? session.user?.email}</p>
//       <Button onClick={() => authClient.signOut({
//         fetchOptions: {onSuccess: () => router.push('/sign-in')}
//       })}>Sign Out</Button>
//     </div>
//   );
// }


"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Antonio" }));

  return (
    <div className="flex flex-col p-4 gap-y-4">
      {data?.greeting}
    </div>
  );
};
