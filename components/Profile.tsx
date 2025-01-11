"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome, {session.user?.name}!</h1>

        <div className="flex flex-col items-center mb-6">
          {session.user?.image && (
            <Image
              src={session.user?.image}
              alt="User avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
              height={100}
              width={100}
            />
          )}
          <p className="text-lg text-gray-600">{session.user?.email}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
