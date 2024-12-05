import Text from "@/components/typography/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { /* useAuthState, */ AuthStateType } from "@/hooks/useAuthState";
import { otpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Title from "./title";
import { Button } from "@/components/ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface IError {
  response: { data: { errors: { code: string; message: string }[] } };
}
const RegisterVerify = ({
  step,
  setStep,
  className,
}: {
  step: AuthStateType["step"];
  setStep: (step: AuthStateType["step"]) => void;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  //   const router = useRouter();

  const params = useSearchParams();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true);
    try {
      const data: { data: { success: boolean } } = await axios.post(
        "/api/mail/verify-otp",
        {
          email: atob(params.get("f-email") || "dGVzdEBnbWFpbC5jb20="),
          otp: values.otp,
        }
      );

      if (data.data.success) {
        toast.success("Email verified", {
          position: "top-center",
          description: "You can now login",
        });
        setStep("login");
      }
    } catch (err) {
      // @typescript-eslint/ban-ts-comment
      const error = err as IError;
      if (error.response.data.errors) {
        error.response.data.errors.map((errorr) => {
          if (errorr.code === "otp_invalid") {
            form.setError("otp", {
              type: "validate",
              message: errorr.message,
            });
            toast.error("Invalid OTP", {
              position: "top-center",
              description: "Please enter a valid OTP",
            });
          }
          if (errorr.code === "otp_expired") {
            form.setError("otp", {
              type: "validate",
              message: errorr.message,
            });
            toast.error("OTP Expired", {
              position: "top-center",
              description: "Please resend it <|inline_middle|>),",
            });
          }
          if (errorr.code === "otp_not_found") {
            form.setError("otp", {
              type: "validate",
              message: errorr.message,
            });
            toast.error("Otp not found", {
              position: "top-center",
              description: "Please enter a valid email",
            });
          }
          if (errorr.code === "user_already_verified") {
            form.setError("otp", {
              type: "validate",
              message: errorr.message,
            });
            toast.error("User is already verified", {
              position: "top-center",
            });
          }
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
          description: "Please try again in a few minutes",
        });
      }
      // form.resetField("otp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.resetField("otp");
  }, [step]);
  return (
    <div className={`w-full h-screen bg-background ${className} px-6 sm:px-0`}>
      <Text
        onClick={() => setStep("login")}
        size="xl"
        weight="bold"
        className="text-center cursor-pointer h-min w-full py-[22px] border-b border-b-line mb-[160px]"
        role="button"
        tabIndex={0}
      >
        CineMax
      </Text>
      <div className="w-full max-w-[500px] mx-auto">
        <Title
          title="Verifying Your Account"
          description={`We have just sent you 6 digit code via your email ${atob(
            params.get("f-email") || "dGVzdEBnbWFpbC5jb20="
          )}`}
          className="mb-[40px]"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <div className="space-y-10">
                  <FormItem className="space-y-2">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className="justify-center w-full gap-6 xs:gap-[24px] duration-300">
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={1}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={2}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={4}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={5}
                              className="w-[40px] xs:w-[56px] h-[40px] !rounded-[18px] !xs:rounded-[24px] xs:h-[56px] text-[24px] font-bold font-inter border border-line dark:bg-dark bg-grayscale-10 text-grayscale-70"
                            />
                          </InputOTPGroup>
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="space-y-2">
                    <Button
                      type="submit"
                      className="w-full h-[58px]"
                      disabled={loading}
                    >
                      <Text size="lg" weight="semibold">
                        Verify
                      </Text>
                      <Loader2
                        className={cn(
                          `animate-spin duration-300 opacity-0`,
                          loading && "opacity-100"
                        )}
                        size="24"
                      />
                    </Button>
                    <button
                      type="button"
                      className="w-full focus-visible:ring-4 outline-none rounded-[24px] py-[16px] duration-300"
                    >
                      <Text
                        size="lg"
                        weight="semibold"
                        className="!text-grayscale-70"
                      >
                        Resend
                      </Text>
                    </button>
                    <Button
                      type="button"
                      className="w-full h-[58px]"
                      variant="secondary"
                      onClick={() => setStep("signup")}
                    >
                      <Text size="lg" weight="semibold">
                        Go Back
                      </Text>
                    </Button>
                  </div>
                </div>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterVerify;
