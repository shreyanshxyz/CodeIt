import React from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  // Getting our state
  const authModal = useRecoilValue(authModalState);
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-slate-100 rounded-lg shadow relative w-full mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-black"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {/* Showing the modal based on its type */}
            {authModal.type === "login" ? (
              <Login />
            ) : authModal.type === "register" ? (
              <SignUp />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;
