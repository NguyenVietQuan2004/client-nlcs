"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await authApi.login(data);
      console.log(result);
      router.push("/");
    } catch (error: any) {
      console.log("LOGIN_ERROR", error);
      if (error.statusCode === 401) {
        form.setError("password", { type: "manual", message: error.message || "Something went wrong, try later." });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className="space-y-8"
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
        {}
        <button type="submit" className={` bg-[#6a92a4] text-white h-[52px]  w-full rounded-2xl mt-8 hover:opacity-90`}>
          Log in
        </button>
      </form>
    </Form>
  );
}

export default LoginForm;
