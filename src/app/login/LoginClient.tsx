"use client";
import { useState } from "react";
import LoginWithFirebase from "./LoginFirebase";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function LoginClient() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="bg-[#e2e8ed] select-none flex justify-center items-center h-[100vh]">
      <div className=" w-[360px] min-h-[86vh] overflow-hidden relative flex flex-col items-center bg-cover bg-center  pt-[100px] pb-[100px] bg-loginIamge  rounded-2xl">
        <div className={`absolute  ${isSignUp ? "top-[15%]" : "top-[5%]"}  transition-all duration-500`}>
          <div className="flex justify-center items-center">
            {!isSignUp && (
              <span className="text-zinc-500 text-base font-semibold transition-all duration-500">or </span>
            )}
            <div
              className={`cursor-pointer text-white font-bold ml-1 ${
                isSignUp ? "text-2xl font-bold" : "text-base font-semibold underline"
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign up
            </div>
          </div>
          {/* </div> */}

          {/* <form className={`transition-all duration-500 mt-[70px]  px-12 ${isSignUp ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-white overflow-hidden rounded-2xl pl-1">
              <input placeholder="Name" className="h-[52px] outline-none pl-4 w-full" />
              <input
                placeholder="Email"
                className="h-[52px] outline-none pl-4 border-t-2 border-b-2 border-zinc-100 w-full"
              />
              <input placeholder="Password" className="h-[52px] outline-none pl-4 w-full" />
            </div>
            <button className="bg-black text-white bg-opacity-20 h-[52px] w-full rounded-2xl mt-6 hover:bg-opacity-30 transition-all duration-500">
              Sign up
            </button>
          </form> */}

          <RegisterForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </div>
        {/* login */}
        <div
          className={`  ${
            isSignUp ? "top-[78%] mt-12" : "top-[14%] "
          } bg-white w-[1600px] bg-opacity-100   h-[1600px] transition-all duration-500 flex items-center flex-col   pt-6  rounded-[1000px] absolute`}
        >
          <div className="flex justify-center">
            {isSignUp && <span className="text-zinc-500 font-semibold transition-all duration-500">or </span>}
            <div
              className={`cursor-pointer font-bold ml-1 ${
                isSignUp ? "text-base font-semibold underline" : "text-2xl font-bold"
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Log in
            </div>
          </div>
          {/* <form
            className={`transition-all duration-500 w-[360px] mt-[50px]  px-12 ${
              !isSignUp ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-white overflow-hidden rounded-2xl">
              <input placeholder="Email" className="h-[52px] outline-none pl-4  border-b-2 border-zinc-100 w-full" />
              <input placeholder="Password" className="h-[52px] outline-none pl-4 w-full" />
            </div>
            <button className={` bg-[#6a92a4] text-white h-[52px]  w-full rounded-2xl mt-8 hover:opacity-90`}>
              Log in
            </button>
          </form> */}
          <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          <span className="my-3 font-semibold transition-all duration-500">OR</span>
          <LoginWithFirebase />
        </div>
      </div>
    </div>
  );
}

export default LoginClient;
