import { toast } from "@/components/ui/use-toast";

interface handlErrorProps {
  consoleError: string;
  error: any;
  isToast?: boolean;
}

export const handlError = ({ consoleError, error, isToast = false }: handlErrorProps) => {
  console.error(consoleError, error);

  // toast chi hoat dong o client componet
  if (typeof window !== "undefined" && isToast) {
    toast({
      title: error?.message || "Something went wrong.",
      variant: "destructiveCustom",
    });
  }
};
