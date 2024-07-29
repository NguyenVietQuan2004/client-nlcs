"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { LoginResType } from "@/Type/AuthTypes";
import { handlError } from "@/components/handle-error";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { GoogleIcon } from "../../../../public/icons/icons";
import Image from "next/image";
import LoginWithFirebase from "./login-firebase";

interface ResgisterFormProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Pass must be at least 6 characters.",
  }),
});
function LoginForm({ isSignUp }: ResgisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result: LoginResType = await authApi.login(data);
      await authApi.sendCookieToServer(result);
      localStorage.setItem("user", JSON.stringify(result.data.userName));
      window.location.assign("/");
    } catch (error: any) {
      handlError({
        consoleError: "LOGIN_ERROR",
        error,
      });
      if (error.statusCode === 401) {
        form.setError("password", { type: "manual", message: error.message || "Something went wrong, try later." });
      }
    }
  };
  return (
    <div
      className={`absolute ${
        isSignUp ? "right-[25%] opacity-0 z-30" : "right-1/2 opacity-100 z-40"
      } top-1/2  -translate-y-1/2 w-[25%] transition-all duration-1000  bg-white p-10 pb-0  min-h-[600px]  flex-1  `}
    >
      <h2 className="text-[26px] text-center font-extrabold mt-8">Sign in</h2>
      <LoginWithFirebase />
      <div className="text-center text-sm font-medium">Or use your account</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex gap-y-2 flex-col items-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="h-[52px]  shadow-sm pl-4  border-b-2 border-zinc-100 w-full  !ring-0  !ring-offset-0 !outline-none"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    className="h-[52px]  shadow-sm pl-4  border-b-2 border-zinc-100 w-full  !ring-0  !ring-offset-0 !outline-none"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <button type="submit" className="py-3 font-bold bg-red-400 text-white px-12 border rounded-full mt-5">
            Sign in
          </button>
        </form>
      </Form>
      <div className="mt-4 text-sm text-blue-400 cursor-pointer underline">Forgot password? </div>
      <div className="h-16 w-16 mx-auto mt-4">
        <Image priority alt="" src="/hange.png" className="h-full w-full object-cover" width={300} height={300} />
      </div>
    </div>
  );
}

export default LoginForm;
