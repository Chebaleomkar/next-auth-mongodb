import { getServerSession } from "next-auth/next";
import userModel from "@/models/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DBconnect } from "@/utils/dbConnect";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }
        DBconnect();
        // Find the current user by email
        const currentUser = await userModel.findOne({ email: session.user.email }).lean();

        if (!currentUser) {
            return null;
        }

        // Return user details with date fields formatted as strings
        return {
            ...currentUser,
        };
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
