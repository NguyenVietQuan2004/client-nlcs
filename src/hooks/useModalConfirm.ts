import { create } from "zustand";

interface ModalCreateProps {
  isShowModalConfirm: boolean;
  setIsShowModalConfirm: (isShowModalConfirm: boolean) => void;
}

const useModalConfirm = create<ModalCreateProps>()((set) => ({
  isShowModalConfirm: false,
  setIsShowModalConfirm: (isShowModalConfirm: boolean) => set({ isShowModalConfirm }),
}));
export default useModalConfirm;
