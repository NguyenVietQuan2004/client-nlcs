"use client";

import { useState } from "react";

import LoginForm from "@/app/auth/(login)/login-form";
import RegisterForm from "@/app/auth/(register)/register-form";
import LoginWithFirebase from "@/app/auth/(login)/login-firebase";

function AuthClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="bg-[#e2e8ed] select-none flex justify-center items-center h-[100vh]">
      <div className=" w-[360px] min-h-[86vh] overflow-hidden relative flex flex-col items-center bg-cover bg-center  pt-[100px] pb-[100px] bg-loginIamge  rounded-2xl">
        {/* register */}
        <div className={`absolute  ${isSignUp ? "top-[15%]" : "top-[5%]"}  transition-all duration-500`}>
          <div className="flex justify-center items-center">
            {!isSignUp && <span className="text-zinc-500 text-base font-semibold transition-all duration-500">or</span>}
            <div
              className={`cursor-pointer text-white font-bold ml-1 ${
                isSignUp ? "text-2xl font-bold" : "text-base font-semibold underline"
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign up
            </div>
          </div>
          <RegisterForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </div>
        {/* login */}
        <div
          className={`  ${
            isSignUp ? "top-[78%] mt-12" : "top-[14%] "
          } bg-white w-[1600px] bg-opacity-100   h-[1600px] transition-all duration-500 flex items-center flex-col   pt-6  rounded-[1000px] absolute`}
        >
          <div className="flex justify-center">
            {isSignUp && <span className="text-zinc-500 font-semibold transition-all duration-500">or</span>}
            <div
              className={`cursor-pointer font-bold ml-1 ${
                isSignUp ? "text-base font-semibold underline" : "text-2xl font-bold"
              }`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Log in
            </div>
          </div>
          <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          <span className="my-3 font-semibold transition-all duration-500">OR</span>
          <LoginWithFirebase />
        </div>
      </div>
    </div>
  );
}

export default AuthClient;
