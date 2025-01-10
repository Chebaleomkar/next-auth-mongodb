import bcrypt from "bcrypt";
import { DBconnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";

DBconnect();

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const {  name, email, password } = await req.json();

        // Check for missing fields
        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user in the database
        const newUser = new userModel({
            email,
            name,
            password : hashedPassword
        })
        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully", newUser },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Internal Server Error", error: String(error) }, { status: 500 });
        }
    }
}
