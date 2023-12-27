import AutoCode from "@/components/AutoCode/AutoCode";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className="bg-gradient-to-b from-black to-black h-screen relative">
      <div className="max-w-7xl mx-auto ">
        <Navbar />
        <AutoCode />
        <AuthModal />
      </div>
    </div>
  );
};
export default AuthPage;
