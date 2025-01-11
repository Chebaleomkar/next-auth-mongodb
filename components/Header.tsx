"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    const { data: session, status } = useSession();

    return (
        <header className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
            {/* Logo Section */}
            <div className="text-lg font-bold">
                <Link href="/">
                    My App
                </Link>
            </div>

            {/* User Section */}
            <div>
                {status === "loading" ? (
                    <p className="animate-pulse">Loading...</p>
                ) : session ? (
                    // User is logged in
                    <div className="flex items-center gap-4">
                        <Image
                            src={session.user?.image || "/default-avatar.png"}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border-2 border-white"
                            width={100}
                            height={100}
                        />
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/api/auth/signin">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    >
                        Login
                    </button>
                    </Link>
                )}
            </div>
        </header>
    );
};
