import Text from "@/components/typography/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthState, { AuthStateType } from "@/hooks/useAuthState";
import { emailSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Title from "./title";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Forgot = ({
  setStep,
  className,
}: {
  step: AuthStateType["step"];
  setStep: (step: AuthStateType["step"]) => void;
  className?: string;
}) => {
  const { settestOtp } = useAuthState();
  const router = useRouter();
  const existEmail = useSearchParams().get("email");

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: existEmail || "",
    },
  });
  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log(values);
    const code = Math.floor(Math.random() * 1000000);
    settestOtp(code + "");
    toast.success(`Test OTP: ${code}`, {
      position: "top-center",
      description: "Please enter the test OTP shown in the notification ",
    });
    setStep("otp");
  };
  return (
    <div className={`w-full h-screen bg-background ${className}`}>
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
          title="Forgot Password"
          description="Recover your account password"
          className="mb-[40px]"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="space-y-10">
                  <FormItem className="space-y-2">
                    <FormLabel>
                      <Text
                        className="!text-grayscale-70"
                        size="sm"
                        weight="medium"
                      >
                        Email
                      </Text>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                        // {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        value={field.value}
                        onBlur={() => field.onBlur()}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          router.push(
                            e.target.value
                              ? `/auth?email=${e.target.value}`
                              : `/auth`
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="space-y-2">
                    <Button type="submit" className="w-full h-[58px]">
                      <Text size="lg" weight="semibold">
                        Send Code
                      </Text>
                    </Button>
                    <Button
                      type="button"
                      className="w-full h-[58px]"
                      variant="secondary"
                      onClick={() => setStep("login")}
                    >
                      <Text size="lg" weight="semibold">
                        Back to login
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

export default Forgot;
