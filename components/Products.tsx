"use client";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

// Fetcher function to get data from the API
const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then((res) => res.json());

export const Products = () => {
    // SWR hook to fetch data from the API
    const { data, error } = useSWR("https://dummyjson.com/products", fetcher);

    // Handle loading state
    if (error) return <div>Error loading products</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.products.map((product: { id: number; title: string; price: number; thumbnail: string }) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-64 object-cover"
                            width={100}
                            height={100}
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-lg text-gray-600">${product.price}</p>
                            <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                                View Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
