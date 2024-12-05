"use client";

import Forgot from "@/app/auth/_components/forgot";
import Login from "@/app/auth/_components/login";
// import NewPassword from "@/app/auth/_components/new-password";
import Register from "@/app/auth/_components/register";
import { ModeToggle } from "@/components/themes/theme-toggle";
import ForgotVerify from "@/app/auth/_components/forgot-verify";
import useAuthState, { AuthStateType } from "@/hooks/useAuthState";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect /*useState*/, useState } from "react";
import NoSSR from "react-no-ssr";
import RegisterVerify from "@/app/auth/_components/register-verify";

const Auth = () => {
  const { step, setStep } = useAuthState();
  const [stepping, setStepping] = useState<boolean>(false);
  const [prevStep, setPrevStep] = useState<AuthStateType["step"]>("login");
  const session = useSession();

  useEffect(() => {
    if (window) {
      console.log(step);

      if (localStorage.getItem("step")) {
        setStep(localStorage.getItem("step") as AuthStateType["step"]);
      } else {
        setStep("login");
      }
    }
  }, []);
  useEffect(() => {
    // step === "none" && window.location.replace("/");
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [step]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      window.location.replace("/");
    }
  }, [session]);
  const setManualStep = (current_step: AuthStateType["step"]): void => {
    setPrevStep(step);
    localStorage.setItem("step", current_step);
    setStep(current_step);
    setStepping(true);

    setTimeout(() => {
      setStepping(false);
    }, 300);
  };
  return (
    <NoSSR>
      <Login
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 animate-show-section",
          step === "login" && "translate-x-0",
          step !== "login" && !stepping && "hidden",
          prevStep !== "login" && step !== "login" && "opacity-0",
          stepping && prevStep === "login" && "animate-hide-section"
        )}
      />
      <Register
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 animate-show-section",
          step === "signup" && "translate-x-0",
          step !== "signup" && !stepping && "hidden",
          prevStep !== "signup" && step !== "signup" && "opacity-0",
          stepping && prevStep === "signup" && "animate-hide-section"
        )}
      />
      <Forgot
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 animate-show-section",
          step === "forgot" && "translate-x-0",
          step !== "forgot" && !stepping && "hidden",
          prevStep !== "forgot" && step !== "forgot" && "opacity-0",
          stepping && prevStep === "forgot" && "animate-hide-section"
        )}
      />
      <ForgotVerify
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 animate-show-section",
          step === "forgot-otp" && "translate-x-0",
          step !== "forgot-otp" && !stepping && "hidden",
          prevStep !== "forgot-otp" && step !== "forgot-otp" && "opacity-0",
          stepping && prevStep === "forgot-otp" && "animate-hide-section"
        )}
      />
      <RegisterVerify
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 animate-show-section",
          step === "register-otp" && "translate-x-0",
          step !== "register-otp" && !stepping && "hidden",
          prevStep !== "register-otp" && step !== "register-otp" && "opacity-0",
          stepping && prevStep === "register-otp" && "animate-hide-section"
        )}
      />
      {/* {step === "new_password" && <NewPassword />} */}
      <div className="fixed top-10 right-10">
        <ModeToggle />
      </div>
    </NoSSR>
  );
};

export default Auth;
