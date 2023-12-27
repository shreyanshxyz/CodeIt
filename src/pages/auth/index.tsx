import { authModalState } from "@/atoms/authModalAtom";
import AutoCode from "@/components/AutoCode/AutoCode";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  // Accessing our auth states for the modal
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;
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
