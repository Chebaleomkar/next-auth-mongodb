"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { NavbarItems } from "@/utils/constants";

export const Header = () => {
    const { data: session, status } = useSession();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    return (
        <header className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
            {/* Logo Section */}
            <div className="text-lg font-bold">
                <Link href="/">My App</Link>
            </div>
            <div className="text-white flex flex-row gap-2 font-semibold ">
                {NavbarItems.map((item , i)=>(
                    <div key={i} className="hover:underline">
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
            {/* User Section */}
            <div>
                {status === "loading" ? (
                    <p className="animate-pulse">Loading...</p>
                ) : session ? (
                    // User is logged in
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Image
                                src={session.user?.image || "/user.jpg"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                                width={100}
                                height={100}
                                onClick={togglePopup}
                            />
                            {/* User Info Popup */}
                            {isPopupOpen && (
                                <div className="absolute top-12 right-0 bg-gray-800 text-white p-5 rounded-lg shadow-xl w-64 transition-all duration-300 ease-in-out transform opacity-100 z-50">
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold text-lg text-center">{session.user?.name || "User"}</p>
                                    <p className="text-sm text-center text-gray-400">{session.user?.email || "email"}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => {signOut() ; window.location.href = '/'}}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                            
                            )}
                        </div>
                    </div>
                ) : (
                    <Link href="/login">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};
