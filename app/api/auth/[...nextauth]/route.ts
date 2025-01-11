import NextAuth, { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import userModel from "@/models/user";
import { DBconnect } from "@/utils/dbConnect";

export const authOptions: NextAuthOptions  = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                DBconnect();

                // Find the user in the database
                const user = await userModel.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("Email does not exist or password is missing");
                }

                // Validate the password
                const isCorrectPassword = await compare(credentials.password, user.password);

                if (!isCorrectPassword) {
                    throw new Error("Incorrect password");
                }

                // Return the user object
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                };
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export const getSession = () => getServerSession(authOptions)

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}