import { create } from "zustand";

type ConfettiStore = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
