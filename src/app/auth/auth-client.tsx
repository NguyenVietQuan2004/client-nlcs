// "use client";

// import { useState } from "react";

// import LoginForm from "@/app/auth/(login)/login-form";
// import RegisterForm from "@/app/auth/(register)/register-form";
// import LoginWithFirebase from "@/app/auth/(login)/login-firebase";

// function AuthClient() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   return (
//     <div className="bg-[#e2e8ed] select-none flex justify-center items-center h-[100vh]">
//       <div className=" w-[360px] min-h-[86vh] overflow-hidden relative flex flex-col items-center bg-cover bg-center  pt-[100px] pb-[100px] bg-loginIamge  rounded-2xl">
//         {/* register */}
//         <div className={`absolute  ${isSignUp ? "top-[15%]" : "top-[5%]"}  transition-all duration-500`}>
//           <div className="flex justify-center items-center">
//             {!isSignUp && <span className="text-zinc-500 text-base font-semibold transition-all duration-500">or</span>}
//             <div
//               className={`cursor-pointer text-white font-bold ml-1 ${
//                 isSignUp ? "text-2xl font-bold" : "text-base font-semibold underline"
//               }`}
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               Sign up
//             </div>
//           </div>
//           <RegisterForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
//         </div>
//         {/* login */}
//         <div
//           className={`  ${
//             isSignUp ? "top-[78%] mt-12" : "top-[14%] "
//           } bg-white w-[1600px] bg-opacity-100   h-[1600px] transition-all duration-500 flex items-center flex-col   pt-6  rounded-[1000px] absolute`}
//         >
//           <div className="flex justify-center">
//             {isSignUp && <span className="text-zinc-500 font-semibold transition-all duration-500">or</span>}
//             <div
//               className={`cursor-pointer font-bold ml-1 ${
//                 isSignUp ? "text-base font-semibold underline" : "text-2xl font-bold"
//               }`}
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               Log in
//             </div>
//           </div>
//           <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
//           <span className="my-3 font-semibold transition-all duration-500">OR</span>
//           <LoginWithFirebase />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthClient;

////

"use client";

import { useState } from "react";

import LoginForm from "@/app/auth/(login)/login-form";
import RegisterForm from "./(register)/register-form";

function AuthClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="bg-[#e2e8ed] select-none flex justify-center items-center h-[100vh] ">
      <div className={` fixed inset-0  z-30 flex  shadow-xl  rounded-sm  `}>
        <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <RegisterForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <div
          className={` absolute ${
            isSignUp ? "left-[25%] " : " left-1/2"
          }  min-h-[600px] w-[25%] top-1/2 -translate-y-1/2  transition-all  duration-1000  bg-red-400 flex items-center justify-center flex-col p-10 flex-1 z-40`}
        >
          <div className="text-[26px]  font-extrabold text-white">
            <span className={`${isSignUp ? "hidden" : "block"} transition-all  duration-1000 `}>Welcome back!</span>
            <span className={`${isSignUp ? "block" : "hidden"} transition-all  duration-1000 `}>Hello, Friends</span>
          </div>
          <div className="text-center text-white my-2">
            {isSignUp
              ? "Enter you personal details and start journey with us"
              : "To keep connected with us please login with your personal info"}
          </div>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            type="button"
            className="py-2 font-bold text-white  px-12 border border-white rounded-full mt-5"
          >
            {isSignUp ? " Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthClient;
