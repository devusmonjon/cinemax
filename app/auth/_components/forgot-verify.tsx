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
import useAuthState, { AuthStateType } from "@/hooks/useAuthState";
import { otpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Title from "./title";
import { Button } from "@/components/ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const ForgotVerify = ({
  step,
  setStep,
  className,
}: {
  step: AuthStateType["step"];
  setStep: (step: AuthStateType["step"]) => void;
  className?: string;
}) => {
  const { testOtp } = useAuthState();

  // const router = useRouter();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = (values: z.infer<typeof otpSchema>) => {
    console.log(values);
    // setStep("otp");
    if (values.otp === testOtp) {
      setStep("new_password");
    } else {
      toast.error("Invalid OTP", {
        position: "top-center",
        description: "Please enter a valid OTP",
      });
    }
  };

  useEffect(() => {
    form.resetField("otp");
  }, [step]);
  return (
    <div className={`w-full h-screen bg-background ${className} px-6 xs:px-0`}>
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
          description={`We have just sent you 6 digit code via your email example@gmail.com`}
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
                    <Button type="submit" className="w-full h-[58px]">
                      <Text size="lg" weight="semibold">
                        Verify
                      </Text>
                    </Button>
                    <button className="w-full focus-visible:ring-4 outline-none rounded-[24px] py-[16px] duration-300">
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
                      onClick={() => setStep("forgot")}
                    >
                      <Text size="lg" weight="semibold">
                        Email is incorrect
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

export default ForgotVerify;
