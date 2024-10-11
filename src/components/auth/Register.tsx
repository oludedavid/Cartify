/* eslint-disable */
"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormLayout from "@/components/form/formLayout";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/features/spinner";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registerFormSchema = z.object({
  fullName: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .toLowerCase(),
  email: z
    .string()
    .min(10, {
      message: "Fullname must be at least 10 characters.",
    })
    .email({
      message: "Invalid email address",
    })
    .toLowerCase(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .toLowerCase(),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .toLowerCase(),
});

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordThesame, setIsPasswordTheSame] = React.useState(true);
  const [register, setRegister] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const baseURL = `http://localhost:3000/api/auth/register`;

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { reset } = form;
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const { fullName, email, password, confirmPassword } = values;
    console.log(values);
    setLoading(true);

    if (password !== confirmPassword) {
      setIsPasswordTheSame(false);
      setLoading(false);
      return;
    }

    axios
      .post(baseURL, { fullName, email, password })
      .then((response) => {
        setLoading(false);
        toast({
          title: "Success",
          description: `Your account has been created. Please check your email to verify your account.`,
          variant: "default",
        });
        setRegister(true);
        router.push("/signIn");
        reset();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.statusText ||
          "An error occurred during registration.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
      });
  }
  function toggleAlert() {
    setRegister(false);
  }

  return (
    <>
      {register && (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Registration was successful. Please verify your email address to
            activate your account. <Button onClick={toggleAlert}>Cancel</Button>
          </AlertDescription>
        </Alert>
      )}
      <FormLayout action="register">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5 text-white"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem
                  style={{
                    background: "#010415",
                    border: "0.7px rgba(166, 166, 166, 0.24)",
                    boxShadow:
                      "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                    borderRadius: "6px",
                  }}
                  className="flex items-center border border-solid rounded-md px-6 py-2"
                >
                  <FormControl className="w-full">
                    <Input
                      className="focus:outline-none focus-visible:ring-transparent w-full h-full py-0 px-2 border-none"
                      placeholder="Fullname"
                      {...field}
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
                <FormItem
                  style={{
                    background: "#010415",
                    border: "0.7px rgba(166, 166, 166, 0.24)",
                    boxShadow:
                      "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                    borderRadius: "6px",
                  }}
                  className="text-white flex items-center border border-solid rounded-md px-6 py-2"
                >
                  <FormControl className="w-full">
                    <Input
                      className="focus:outline-none focus-visible:ring-transparent w-full h-full py-0 px-2 border-none"
                      placeholder="Email"
                      {...field}
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
                <FormItem
                  style={{
                    background: "#010415",
                    border: "0.7px rgba(166, 166, 166, 0.24)",
                    boxShadow:
                      "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                    borderRadius: "6px",
                  }}
                  className=" flex items-center border border-solid rounded-md px-6 py-2"
                >
                  <FormControl className="w-full">
                    <Input
                      type="password"
                      className="focus:outline-none focus-visible:ring-transparent w-full h-full py-0 px-2 border-none"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem
                  style={{
                    background: "#010415",
                    border: "0.7px rgba(166, 166, 166, 0.24)",
                    boxShadow:
                      "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                    borderRadius: "6px",
                  }}
                  className=" flex items-center border border-solid rounded-md px-6 py-2"
                >
                  <FormControl className="w-full">
                    <Input
                      className="focus:outline-none focus-visible:ring-transparent w-full h-full py-0 px-2 border-none"
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <small className="text-red-600 text-center ">{`${
              isPasswordThesame ? "" : "Passwords do not match"
            }`}</small>
            <Button className="rounded-lg" type="submit">
              {loading ? (
                <Spinner className="text-gray-400" size="small" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </FormLayout>
    </>
  );
}
