import { create } from "zustand";

export type AuthStateType = {
  step: "login" | "signup" | "otp" | "forgot" | "new_password" | "none";
  setStep: (step: AuthStateType["step"]) => void;
  testOtp: string;
  settestOtp: (otp: string) => void;
};

const useAuthState = create<AuthStateType>()((set) => ({
  step: "none",
  setStep: (step) => set({ step }),
  testOtp: "",
  settestOtp: (otp) => set({ testOtp: otp }),
}));

export default useAuthState;