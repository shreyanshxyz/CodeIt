import { authModalState } from "@/atoms/authModalAtom";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

type SignUpProps = {};
const loading = false;
const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  function handleClick(type: string) {
    setAuthModal((prev) => ({ ...prev, type: "login" }));
  }

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    // It will check the name of the input i.e. "Email/Password/Display Name", and change it, not mutating the others
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleRegister(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputs);
  }

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-2xl font-semibold text-black">Sign-Up to CodeIt</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-900"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5
            bg-gray-200 border-gray-500 placeholder-gray-400 text-gray-900
    "
          placeholder="name@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-900"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5
            bg-gray-200 border-gray-500 placeholder-gray-400 text-gray-900
    "
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-900"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5
            bg-gray-200 border-gray-500 placeholder-gray-400 text-gray-900
    "
          placeholder="*******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-green-600 hover:bg-green-800
        "
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <div className="text-sm font-medium text-gray-900">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("login")}
        >
          Log In
        </a>
      </div>
    </form>
  );
};
export default SignUp;
