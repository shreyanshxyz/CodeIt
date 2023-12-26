import Link from "next/link";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        <p className="text-white">Logo</p>
      </Link>
      <div className="flex items-center">
        <button className="bg-green-600 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-green-600 hover:bg-slate-50 hover:border-2 hover:border-green-600 transition duration-500 ease-in-out">
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
