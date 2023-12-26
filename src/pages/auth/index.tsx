import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className="bg-gradient-to-b from-black to-black h-screen relative">
      <div className="max-w-7xl mx-auto ">
        <Navbar />
      </div>
    </div>
  );
};
export default AuthPage;
