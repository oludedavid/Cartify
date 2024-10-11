import { NextRequest } from "next/server";
import UserActions from "@/actions/user";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const userActions = new UserActions();
  try {
    const body: RequestBody = await req.json();

    // Check for missing fields
    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Find the user by email
    const findUser = await userActions.getUserByEmail(body.email);
    if (!findUser) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Compare the provided password with the stored hash
    const isPasswordCorrect = await userActions.isPasswordCorrect(
      body.email,
      body.password
    );
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
    // Convert the Mongoose document to a plain object and remove the password field
    const userWithoutPassword = findUser.toObject();
    delete userWithoutPassword.password;

    return new Response(JSON.stringify({ user: userWithoutPassword }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
