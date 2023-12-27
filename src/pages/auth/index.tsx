import { authModalState } from "@/atoms/authModalAtom";
import AutoCode from "@/components/AutoCode/AutoCode";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { useRecoilValue } from "recoil";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  // Accessing out auth states for the modal
  const authModal = useRecoilValue(authModalState);
  return (
    <div className="bg-gradient-to-b from-black to-black h-screen relative">
      <div className="max-w-7xl mx-auto ">
        <Navbar />
        <AutoCode />
        {/* When authModal is open, then only show the modal for authentication or else don't */}
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default AuthPage;
