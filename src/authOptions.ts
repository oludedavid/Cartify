import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession, SessionStrategy } from "next-auth";
import axios from "axios";
import UserActions from "@/actions/user";

const userActions = new UserActions();

// Define the authOptions for NextAuth
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullName: { label: "Fullname", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post("http://localhost:3000/api/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          const user = res.data.user;

          if (user) {
            return {
              id: user._id,
              email: user.email,
              name: user.fullName,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 1 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {},
  pages: {
    signIn: "/signIn",
  },
};

// Function to retrieve the server-side session
export const getAuth = async () => {
  return await getServerSession(authOptions);
};
