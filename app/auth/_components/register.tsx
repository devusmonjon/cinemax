import Heading from "@/components/typography/headings";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthStateType } from "@/hooks/useAuthState";
import { registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = ({
  setStep,
  className,
}: {
  step: AuthStateType["step"];
  setStep: (step: AuthStateType["step"]) => void;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams(),
    existEmail = searchParams.get("email"),
    existFullName = searchParams.get("fullName"),
    existUsername = searchParams.get("username");
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: existFullName || "",
      username: existUsername || "",
      email: existEmail || "",
      password: "",
      passwordConfirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className={`w-full h-screen bg-background flex ${className}`}>
      <div className="overflow-hidden xl:min-w-min max-w-0 xl:max-w-[50%] w-full h-full bg-primary duration-300 xl:pt-[85px] xl:pl-[125px] xl:pr-[211px]">
        <div className="opacity-0 xl:opacity-100 duration-300">
          <Heading variant="h5" weight="bold" className="!text-grayscale-10">
            The biggest international and local film streaming
          </Heading>
          <Text className="!text-grayscale-30 pt-[12px]">
            Semper in cursus magna et eu varius nunc adipiscing. Elementum
            justo, laoreet id sem semper parturient.{" "}
          </Text>
        </div>
      </div>
      <div className="w-full duration-300 xl:max-w-[50%] max-w-full h-full flex flex-col items-center overflow-y-auto pb-10 ">
        <Text size="xl" weight="bold" className="pt-[32px]">
          CineMax
        </Text>
        <div className="w-full max-w-[500px] flex flex-col items-center">
          <Heading
            variant="h5"
            weight="bold"
            className="w-[312px] text-center pt-[78px] pb-[40px]"
          >
            Register
          </Heading>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="space-y-[20px]">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          size="sm"
                          weight="medium"
                          className="!text-grayscale-70 pb-[8px]"
                        >
                          Full Name
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                          value={field.value}
                          onBlur={() => field.onBlur()}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            router.push(
                              `/auth?email=${existEmail || ""}&fullName=${
                                e.target.value
                              }&username=${existUsername || ""}`
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          size="sm"
                          weight="medium"
                          className="!text-grayscale-70 pb-[8px]"
                        >
                          Username
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                          value={field.value}
                          onBlur={() => field.onBlur()}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            router.push(
                              `/auth?email=${existEmail || ""}&fullName=${
                                existFullName || ""
                              }&username=${e.target.value}`
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          size="sm"
                          weight="medium"
                          className="!text-grayscale-70 pb-[8px]"
                        >
                          Email Address
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                          value={field.value}
                          onBlur={() => field.onBlur()}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            router.push(
                              `/auth?email=${e.target.value}&fullName=${
                                existFullName || ""
                              }&username=${existFullName || ""}`
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          size="sm"
                          weight="medium"
                          className="!text-grayscale-70 pb-[8px]"
                        >
                          Password
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          size="sm"
                          weight="medium"
                          className="!text-grayscale-70 pb-[8px]"
                        >
                          Confirm Password
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="h-[52px] border-line text-[14px] font-medium leading-[22px] tracking-[0.07px] text-grayscale-60 dark:text-grayscale-60 bg-grayscale-10 dark:bg-dark px-[16px] m-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-[24px]">
                <Button
                  type="submit"
                  className="w-full h-[58px] text-[18px] font-inter font-semibold leading-[26px] tracking-[0.09px] text-grayscale-10"
                >
                  Login
                </Button>
                <Text
                  className="w-full text-center !text-grayscale-60"
                  size="md"
                  weight="semibold"
                >
                  Already have an account?{" "}
                  <button
                    className="text-primary focus-visible:ring-2 outline-none"
                    type="button"
                    onClick={() => setStep("login")}
                  >
                    Login
                  </button>
                </Text>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
