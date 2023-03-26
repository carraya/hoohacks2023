import { useContext, useState } from "react";
import { DataContext } from "../contexts/dataContext";

import { useNavigate } from "react-router-dom";

function AuthCard() {
  const { username, pair, signup, login, logout } = useContext(DataContext);
  const [displayName, setDisplayName] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  return (
    <div className="isolate bg-tPurple py-24 px-6 sm:py-32 lg:px-8 min-h-screen">
      <div className="hidden lg:flex lg:flex-1 lg:justify-start">
        <a href="/" className="text-sm font-semibold leading-6 text-tBlue">
          <span aria-hidden="true">&larr;</span> Back
        </a>
      </div>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Authentication
        </h2>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="relative mt-2.5"></div>
          </div>
          <div className="sm:col-span-2"></div>
        </div>
        <div className="mt-10 flex flex-row space-x-4">
          <button
            type="submit"
            className="bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              try {
                login(displayName, pwd);
                navigate("/unions");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Login
          </button>
          <button
            type="submit"
            className=" bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              try {
                signup(displayName, pwd);
                navigate("/unions");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
