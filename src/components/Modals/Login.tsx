import React from "react";

type LoginProps = {};
const loading = false;
const Login: React.FC<LoginProps> = () => {
  return (
    <form className="space-y-6 px-6 pb-4">
      <h3 className="text-2xl font-semibold text-black">Sign in to CodeIt</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-900"
        >
          Your Email
        </label>
        <input
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
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-900"
        >
          Your Password
        </label>
        <input
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
        className="w-full text-white focus:ring-green-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center  bg-green-600 hover:bg-green-800
            "
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      <button className="flex w-full justify-end">
        <a
          href="#"
          className="text-sm block text-blue-700 hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-900">
        Not Registered?{" "}
        <a href="#" className="text-blue-700 hover:underline">
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
