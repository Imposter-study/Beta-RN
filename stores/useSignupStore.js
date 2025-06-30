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

export default useSignupStore;
