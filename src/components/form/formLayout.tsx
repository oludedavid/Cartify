/* eslint-disable */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormLayout({
  children,
  action,
}: {
  children: React.ReactNode;
  action: string;
}) {
  return (
    <div>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-4 lg:gap-14 items-center p-2">
        <div className="flex flex-col justify-start items-center gap-4 mx-auto p-4">
          <h2>
            {action === "register" ? "Already Signed Up?" : "Not Signed Up?"}
          </h2>
          <p className="items-start text-center max-w-sm font-normal text-base md:text-lg text-gray-600">
            <span className="text-base font-bold"> Welcome to Cartify!</span>{" "}
            Your ultimate shopping companion for a seamless online experience.
            Easily browse products, add items to your cart, and enjoy a smooth
            checkout. Let’s start shopping!
          </p>
          <div>
            <Link href={`${action === "register" ? "/signIn" : "/register"}`}>
              <Button
                className="text-base px-6 lg:px-12 font-medium"
                style={{
                  background: "#DAD7E2",
                  borderRadius: "32px",
                  border: "1px rgba(230, 230, 230, 0.36)",
                  color: "#1F1B2A",
                }}
              >
                {action === "register" ? "Sign in" : "Sign up"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
