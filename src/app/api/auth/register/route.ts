import { NextRequest } from "next/server";
import UserActions from "@/actions/user";

export async function POST(req: NextRequest) {
  const userActions = new UserActions();

  try {
    const { fullName, email, password } = await req.json();

    // Check if user already exists
    const findUser = await userActions.getUserByEmail(email);
    if (findUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!fullName || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create and save the new user
    const user = await userActions.createUser({ fullName, email, password });

    if (!user) {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the created user without exposing the password
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
