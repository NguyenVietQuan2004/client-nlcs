import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { toast } from "@/components/ui/use-toast";
import { handlError } from "@/components/handle-error";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { GoogleIcon } from "../../../../public/icons/icons";
import LoginWithFirebase from "../(login)/login-firebase";

interface ResgisterFormProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const formSchema = z.object({
  userName: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Pass must be at least 6 characters.",
  }),
});
function RegisterForm({ isSignUp, setIsSignUp }: ResgisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await authApi.register(data);
      form.reset();
      setIsSignUp(false);
      toast({
        title: "Register success.",
        variant: "success",
      });
    } catch (error) {
      handlError({
        consoleError: "REGISTER_ERROR",
        error,
        isToast: true,
      });
    }
  };
  return (
    <div
      className={`absolute ${
        isSignUp ? "right-[25%] opacity-100 z-40" : "right-1/2 opacity-0 z-30"
      } top-1/2 -translate-y-1/2  w-[25%] transition-all duration-1000  bg-white p-10  min-h-[600px]  flex-1  `}
    >
      <h2 className="text-[26px] text-center font-extrabold mt-8">Sign up</h2>
      <LoginWithFirebase />
      <div className="text-center text-sm font-medium">Or use your email for registration</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex gap-y-2 flex-col items-center">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="h-[52px]  !ring-0  !ring-offset-0 !outline-none pl-4 border-t-2 border-b-2 border-zinc-100 w-full"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="h-[52px]  !ring-0  !ring-offset-0 !outline-none pl-4 border-t-2 border-b-2 border-zinc-100 w-full"
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
                    className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <button type="submit" className="py-3 font-bold bg-red-400 text-white px-12 border rounded-full mt-5">
            Sign up
          </button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
