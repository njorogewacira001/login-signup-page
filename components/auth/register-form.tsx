"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [error, setError] = useState <string | undefined>("");
    const [success, setSuccess] = useState <string | undefined>("");

    const [ispending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:"",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
    setError("");
    setSuccess("");


    startTransition(() => {
        register(values)
        .then((data) => {
            setError(data.error);
            setSuccess(data.success);
        });
    });
    
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="already have an account?"
      backButtonHref="/auth/login"
      showSoial
    >
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit) } 
        className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={ispending}
                      placeholder="jon doe"
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={ispending}
                      placeholder="jon.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={ispending}
                      placeholder="*****"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>

          <Button
          disabled={ispending}
           type="submit" 
           className="w-full"
           >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
