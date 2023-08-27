import { create } from 'zustand'

interface loginState {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const useRentModal = create<loginState>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default useRentModal;