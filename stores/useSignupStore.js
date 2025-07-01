import { create } from "zustand";

const useSignupStore = create((set) => ({
  username: "",
  password: "",
  password_confirm: "",
  birth_date: "",
  gender: "O",
  introduce: "",

  setUsername: (newUsername) => set({ username: newUsername }),
  setPassword: (newPassword) => set({ password: newPassword }),
  setPasswordConfirm: (newPasswordConfirm) =>
    set({ password_confirm: newPasswordConfirm }),
  setBirthDate: (newBirthdate) => set({ birth_date: newBirthdate }),
  setGender: (newGender) => set({ gender: newGender }),

  setClear: () =>
    set({
      username: "",
      password: "",
      password_confirm: "",
      birth_date: "",
      gender: "O",
      introduce: "",
    }),
}));

export const useSocialSignupStroe = create((set) => ({
  nickname: "",
  access: "",
  refresh: "",

  setNickname: (newNickname) => set({ nickname: newNickname }),
  setAccess: (newAccess) => set({ access: newAccess }),
  setRefresh: (newRefresh) => set({ refresh: newRefresh }),

  setSocialStoreClear: () =>
    set({
      nickname: "",
      access: "",
      refresh: "",
    }),
}));

export default useSignupStore;
