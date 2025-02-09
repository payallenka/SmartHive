"use client";
import React from "react";
import Auth from "../components/Auth"; 

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to SmartHive</h1>
      <Auth />
    </div>
  );
};

export default Home;
