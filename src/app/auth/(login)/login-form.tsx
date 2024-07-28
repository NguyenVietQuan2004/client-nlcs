"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { LoginResType } from "@/Type/AuthTypes";
import { handlError } from "@/components/handle-error";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`transition-all duration-500 w-[360px] mt-[50px]  px-12 ${!isSignUp ? "opacity-100" : "opacity-0"}`}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="h-[52px] pl-4  border-b-2 border-zinc-100 w-full  !ring-0  !ring-offset-0 !outline-none"
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
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <button type="submit" className={` bg-[#6a92a4] text-white h-[52px]  w-full rounded-2xl mt-8 hover:opacity-90`}>
          Log in
        </button>
      </form>
    </Form>
  );
}

export default LoginForm;
