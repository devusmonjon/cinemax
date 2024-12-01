"use client";

import Forgot from "@/app/auth/_components/forgot";
import Login from "@/app/auth/_components/login";
import NewPassword from "@/app/auth/_components/new-password";
import Register from "@/app/auth/_components/register";
import { ModeToggle } from "@/app/auth/_components/theme-toggle";
import Verify from "@/app/auth/_components/verify";
import useAuthState, { AuthStateType } from "@/hooks/useAuthState";
import { cn } from "@/lib/utils";
import { useEffect /*useState*/ } from "react";
import NoSSR from "react-no-ssr";

const Auth = () => {
  const { step, setStep } = useAuthState();
  // const [stepping, setStepping] = useState<AuthStateType["step"] | false>(
  //   false
  // );

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
  const setManualStep = (step: AuthStateType["step"]): void => {
    localStorage.setItem("step", step);
    setStep(step);
  };
  return (
    <NoSSR>
      <Login
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300",
          step === "login" && "translate-x-0"
        )}
      />
      <Register
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 translate-x-full",
          step === "signup" && "translate-x-0"
        )}
      />
      <Forgot
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 -translate-x-full",
          step === "forgot" && "translate-x-0"
        )}
      />
      <Verify
        step={step}
        setStep={setManualStep}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-y-auto duration-300 translate-x-full",
          step === "otp" && "translate-x-0"
        )}
      />
      {step === "new_password" && <NewPassword />}
      <div className="fixed top-10 right-10">
        <ModeToggle />
      </div>
    </NoSSR>
  );
};

export default Auth;
