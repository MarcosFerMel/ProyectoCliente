import { User } from '@/app/components/Navbar';
import { create } from 'zustand';

export interface IUserStore {
    userData: User | null;
    setUserData: (userData: User | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    userData: null,
    setUserData: (userData: User | null) => set({ userData }),
}));