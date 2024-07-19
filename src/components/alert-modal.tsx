import { Trash } from "lucide-react";

import {
  AlertDialog as UiAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoadingButton from "@/components/loadingButton";
import { buttonVariants } from "@/components/ui/button";
import useModalConfirm from "@/hooks/useModalConfirm";

interface AlertModalProps {
  action: string;
  isLoading: boolean;
  onConfirm: () => void;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}
function AlertModal({ variant, action, onConfirm, isLoading }: AlertModalProps) {
  const { isShowModalConfirm, setIsShowModalConfirm } = useModalConfirm();
  return (
    <UiAlertDialog open={isShowModalConfirm}>
      <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsShowModalConfirm(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: variant || "default",
              className: "min-w-[76px]",
            })}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton /> : action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </UiAlertDialog>
  );
}

export default AlertModal;
