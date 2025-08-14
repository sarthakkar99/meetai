// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { useTRPC } from "@/trpc/client";
// import { AgentGetOne } from "../../types";
// import { useRouter } from "next/router";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { agentInsertSchema } from "../../schema";
// import { zodResolver } from "@hookform/resolvers/zod";

// interface AgentFormProps {
//     onSuccess?: () => void;
//     onCancel?: () => void;
//     initialValues?: AgentGetOne

// }

// export const AgentForm = ({
//     onSuccess,
//     onCancel,
//     initialValues
//     }: AgentFormProps) => {
//         const trpc = useTRPC();
//         const router = useRouter();
//         const queryClient = useQueryClient();
//         const createAgent = useMutation(
//             trpc.agents.create.mutationOptions({
//                 onSuccess: () => {},
//                 onError: () => {},

//             }),
//         )
//     };
//     const form = useForm<z.infer<typeof agentInsertSchema>>({
//         resolver: zodResolver(agentInsertSchema),
//         defaultValues: {
//             name: initialValues?.name?? "";
//             instructions: initialValues?.instructions ?? "";
            
//         },
//     })
//     const isEdit = !!initialValues?.id;
//     const isPending = createAgent.isPending || updateAgent.isPending;

//     const onSubmit = (values: z.infer<typeof agentsInsertSchema>) = >{
//         if (isEdit){
//             console.log("update Agent")
//         }
//         else{
//             createAgent.mutate(values);
//         }
//     };
// }

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { useTRPC } from "@/trpc/client";
// import { AgentGetOne } from "../../types";
// import { useRouter } from "next/router";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { agentInsertSchema } from "../../schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GeneratedAvatar } from "@/components/generated-avatar";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage

// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// interface AgentFormProps {
//     onSuccess?: () => void;
//     onCancel?: () => void;
//     initialValues?: AgentGetOne
// }

// export const AgentForm = ({
//     onSuccess,
//     onCancel,
//     initialValues
// }: AgentFormProps) => {
//     const trpc = useTRPC();
//     const router = useRouter();
//     const queryClient = useQueryClient();

//     const createAgent = useMutation(
//         trpc.agents.create.mutationOptions({
//             onSuccess: () => {},
//             onError: () => {},
//         }),
//     );

//     const updateAgent = useMutation(
//         trpc.agents.update.mutationOptions({
//             onSuccess: () => {},
//             onError: () => {},
//         }),
//     );

//     const form = useForm<z.infer<typeof agentInsertSchema>>({
//         resolver: zodResolver(agentInsertSchema),
//         defaultValues: {
//             name: initialValues?.name ?? "",
//             instructions: initialValues?.instructions ?? "",
//         },
//     });

//     const isEdit = !!initialValues?.id;
//     const isPending = createAgent.isPending || updateAgent.isPending;

//     const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
//         if (isEdit && initialValues?.id){
//             console.log("TODO: Update:Agent")
//         } else {
//             createAgent.mutate(values);
//         }
//     };

//     return (

//         <Form {...form}>
//             <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//                 {/* form handlesubmit will not call the on dubmit function if the schema is not correct */}
//                 <GeneratedAvatar seed = {form.watch{"name"}} variant = "botttsNeutral" className = "border size-16" />
//                 <FormField name = "name" control = {form.control} render = {({ field }) => (
//                     <FormItem>
//                         <FormLabel>Name</FormLabel>
//                         <FormControl>
//                             <Input {...field}/>
//                         </FormControl>
//                     </FormItem>
//                 )}

//             </form>
//         </Form>

//     )
// };


import { z } from "zod";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne
}


export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                // when we create a new agent we want to invalidate those queries
                                {/* since invalidate queries are promise you can mark them as async */}

                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),

                );
                if (initialValues?.id){
                    await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({id:initialValues.id}),
                )
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
                // TODO the error code is forbidden redirect
            },
        }),
    );

    const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: () => {},
            onError: () => {},
        }),
    );

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending || updateAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit && initialValues?.id){
            console.log("TODO: Update:Agent");
        } else {
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                {/* form handlesubmit will not call the on submit function if the schema is not correct */}
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Agent name" />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field}
                                placeholder="You are Helpful Math assistant you can help with assignments"
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-x-2" >
                    {onCancel && (
                        <Button variant="ghost"
                        disabled = {isPending}
                        type = "button"
                        onClick = {()=> onCancel()}
                        >
                        Cancel
                        {/* // by clicking cancel you can close because in agent form dialog you have the callback to close ot */}
                             
                        </Button>

                    )}
                    <Button disabled={isPending} type = "submit">
                        {isEdit ? "Update": "Create"}

                    </Button>
                </div>
            </form>
        </Form>
    );
};
