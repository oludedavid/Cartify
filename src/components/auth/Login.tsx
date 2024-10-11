"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/features/spinner";
import FormLayout from "@/components/form/formLayout";

const baseURL = `${process.env.NEXTAUTH_URL}/api/auth/register`;

const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(10, {
      message: "Fullname must be at least 10 characters.",
    })

    .toLowerCase(),
  password: z
    .string()
    .min(8, {
      message: "Fullname must be at least 8 characters.",
    })
    .toLowerCase(),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { email, password } = values;
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false, // Allow us to control redirect manually
        email,
        password,
        callbackUrl: "/",
      });

      if (response?.ok) {
        toast({
          title: "Success",
          description: "Login successful.",
          variant: "default",
        });
        // Redirect to the callback URL
        window.location.href = response.url || "/";
      } else {
        // Handle errors such as incorrect credentials
        toast({
          title: "Error",
          description:
            response?.error ||
            "Failed to login. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Ensure loading state is disabled after process
      setLoading(false);
    }
  }

  return (
    <FormLayout action="login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                style={{
                  background: "#010415",
                  border: "0.7px rgba(166, 166, 166, 0.24)",
                  boxShadow: "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                  borderRadius: "6px",
                }}
                className="text-white flex items-center border border-solid text-center rounded-md px-6 py-2"
              >
                <FormControl className="border-none focus:outline-none focus:border-none">
                  <Input
                    className="focus:outline-none py-2 border-none focus:border-none focus-visible:ring-transparent rounded-md"
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
                  boxShadow: "0px 3.845px 13.459px 0px rgba(31, 82, 149, 0.16)",
                  borderRadius: "6px",
                }}
                className="text-white flex items-center border border-solid text-center rounded-md px-6 py-2"
              >
                <FormControl className="border-none focus:outline-none focus:border-none">
                  <Input
                    className="focus:outline-none py-2 border-none focus:border-none focus-visible:ring-transparent rounded-md"
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading ? (
              <Spinner className="text-gray-400" size="small" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
