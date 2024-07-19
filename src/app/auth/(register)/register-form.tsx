import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

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
    } catch (error: any) {
      toast({
        title: error.message || "Sommething went wrong.",
        variant: "destructiveCustom",
      });
      console.error("REGISTER_ERROR", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`transition-all w-[360px] duration-500 mt-[70px]  px-12 ${isSignUp ? "opacity-100" : "opacity-0"}`}
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
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
            <FormItem>
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
        <button
          type="submit"
          className="bg-black text-white bg-opacity-20 h-[52px] w-full rounded-2xl mt-6 hover:!bg-opacity-30 transition-all duration-500"
        >
          Sign up
        </button>
      </form>
    </Form>
  );
}

export default RegisterForm;
