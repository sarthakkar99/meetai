"use client"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import {email, z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';  // this is npm package rest all are alias import
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button'; 
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/ui/form';
import {Alert, AlertTitle, AlertDescription} from '@/components/ui/alert';
import { Grid, Octagon, OctagonAlert, OctagonAlertIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const formSchema = z.object({ 
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email(),
  password: z.string().min(1, {message: "Password is required"}), // dont enforce length of password on sign in view
  confirmPassword: z.string().min(1, {message: "Password is required"}),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match", path: ["confirmPassword"]});

export const SignUpView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
        setPending(false);
          router.push("/");

      },
      onError: ({error}) => {
        setPending(false);
        setError(error.message);
      }}
    );
  
  };


  return (
    <div className='flex flex-col gap-6'>
        <Card className='overflow-hidden p-0'>
            <CardContent className='grid p-0 md:grid-cols-2'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-col items-center text-center'>
                        <h1 className='text-2xl font-semibold'>
                          Let&apos;s Get You Started!
                        </h1>
                        <p className='text-muted-foreground text-balance'>
                          Please sign in to continue.
                        </p>
                      </div>
                      <div className='Grid gap-3'>
                        <FormField control={form.control}
                        name = 'name' 
                        render = { ({field}) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input type = "text" placeholder = "John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />

                      </div>
                      <div className='Grid gap-3'>
                        <FormField control={form.control}
                        name = 'email' 
                        render = { ({field}) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type = "email" placeholder = "m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />

                      </div>
                      <div className='Grid gap-3'>
                        <FormField control={form.control}
                        name = 'password' 
                        render = { ({field}) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type = "password" placeholder = "********" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />

                      </div>
                      <div className='Grid gap-3'>
                        <FormField control={form.control}
                          name = 'confirmPassword' 
                          render = { ({field}) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type = "password" placeholder = "********" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />

                      </div>
                      {!!error && (
                        <Alert className='bg-destructive/10 border-none'>
                          <OctagonAlertIcon className='h-4 w-4 text-destructive' />
                          <AlertTitle>{error}</AlertTitle>
                        </Alert>
                      )}
                      <Button disabled = {pending} type='submit' className='w-full'>
                        Sign Up
                      </Button>
                      <div className='after:border-border relative text-center text-sm after:absolute after:inset-0
                       after:insert-0 after:top-1/2 after:flex after:items-center after:border-t'>
                        <span className='bg-card text-muted-foreground relative z-10 and px-2'>
                          Or Continue with
                        </span>
                       </div>
                       <div className='grid grid-cols-2 gap-4'>
                        <Button disabled = {pending} variant = "outline" className='w-full'>
                          Google

                        </Button>
                        <Button disabled = {pending} variant = "outline" className='w-full'>
                          Github

                        </Button>
                       </div>
                       <div className='text-center text-sm'>
                        Already have an account? <Link href="/sign-in" className='underline underline-offset-4'>Sign In</Link>
                       </div>
                    </div>
                    
                    </form>
                    </Form>
                        
                
                <div className='bg-radial from-green-500 to to-green-800 relative hidden md:flex flex-col 
                gap-y-4 items-center justify-center'>
                  <img src = "/logo.svg" alt="logo" className='w-[30px] h-[30px]' />
                  <p className='text-2xl font-semibold text-white'>Sign In View2</p>
                  
                </div>
             
            </CardContent>
        </Card>
        <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs 
        text-balance *:[a]:underline *:[a]:underline-offset-4' >
          By Clicking continue you agree to our <a href = "#">Terms of Service</a>terms of service and <a href = "#">Privacy Policy</a>.
        </div>


    </div>

  )
};

