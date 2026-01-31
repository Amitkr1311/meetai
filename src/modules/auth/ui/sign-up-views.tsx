"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {OctagonAlertIcon} from "lucide-react";
import { Google } from "@/components/icons/google";
import {FaGithub} from "react-icons/fa";  

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const signUpFormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),  
  email: z.string().email(),
  password: z.string().min(1, {message: "Password is required"}),
  confirmPassword: z.string().min(1, {message: "Confirm Password is required"}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],  
});


export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (data: z.infer<typeof signUpFormSchema>) => {
    setError(null);
    setPending(true);

      authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      },{
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        } 
      }
    );
  }

  const onSocial = (providers: "Google" | "Github") => {
    setError(null);
    setPending(true);

      authClient.signIn.social({
        provider: providers.toLowerCase() as "google" | "github",
        callbackURL: "/",
      },{
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        } 
      }
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">
                      Let&apos;s get you started!
                    </h1>
                    <p className="text-muted-foreground text-balance">
                        Create an account
                    </p>
                </div>
                <div className="grid gap-3">
                      <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input 
                                type="text"
                                placeholder="John Doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                <div className="grid gap-3">
                      <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="example@meetai.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                <div className="grid gap-3">
                      <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                <div className="grid gap-3">
                      <FormField 
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 text-destructive!"/>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={pending}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Sign up
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 
                  after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span>
                        Or Continue with
                      </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={()=> {onSocial("Google")}}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    <Google className="mr-2 h-4 w-4" /> Google
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={()=>{onSocial("Github")}}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                  >
                    <FaGithub className="mr-2 h-4 w-4" aria-hidden="true" /> Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "} <Link href="/sign-in" className="underline underline-offset-4">
                    Sign in
                  </Link>

                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <Image src="/logo.svg" alt="logo" height={92} width={92} />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
            text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a
            href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
