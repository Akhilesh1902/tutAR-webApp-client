import create from 'zustand';

// import { persist, devtools } from 'zustand/middleware';

export const useUserState = create((set) => ({
  user: {},
  setUesr: ({ name, status, id, password }) => {
    set((state) => {
      user: {
        name: user.name;
      }
    });
  },
}));
