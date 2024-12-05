import { FacebookIcon, GoogleIcon } from "@/assets/icons";
import Heading from "@/components/typography/headings";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AuthStateType } from "@/hooks/useAuthState";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Instagram, Waypoints } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Login = ({
  // step,
  setStep,
  className,
}: {
  step: AuthStateType["step"];
  setStep: (step: AuthStateType["step"]) => void;
  className?: string;
}) => {
  const session = useSession();
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      ...values,
    });
    if (result?.error) {
      toast.error(result.error, { position: "top-center" });
      form.setError("username", {
        type: "validate",
        message: "Username or password is incorrect",
      });
      form.setError("password", {
        type: "validate",
        message: "Username or password is incorrect",
      });
    }
  };

  console.log(session);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    handleLogin(values);
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
      <div className="w-full duration-300 xl:max-w-[50%] max-w-full h-full flex flex-col items-center overflow-y-auto px-6 sm:px-0">
        <Text size="xl" weight="bold" className="pt-[32px]">
          CineMax
        </Text>
        <div className="w-full max-w-[500px] flex flex-col items-center">
          <Heading
            variant="h5"
            weight="bold"
            className="w-[312px] text-center pt-[78px]"
          >
            Hey there, welcome back
          </Heading>
          <div className="space-y-[24px] pt-[40px] w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className="w-full h-[48px] space-x-[16px]"
                >
                  <Waypoints size="24" />
                  <Text weight="semibold">Login with Social</Text>
                </Button>
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild></TooltipTrigger>
                    <TooltipContent>
                      <p>Login with your social account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login with Social</DialogTitle>
                  <DialogDescription>
                    You can login with your social account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-[24px] pt-[40px] w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="w-full h-[48px] space-x-[16px]"
                          onClick={() => signIn("google")}
                        >
                          <GoogleIcon className="!w-[24px] !h-[24px]" />
                          <Text weight="semibold">Login with Google</Text>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login with your Google account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="w-full h-[48px] space-x-[10px]"
                        >
                          <FacebookIcon className="!w-[24px] !h-[24px]" />
                          <Text weight="semibold">Login with FaceBook</Text>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>immediately unavailable</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="w-full h-[48px] space-x-[10px]"
                          onClick={() => signIn("github")}
                        >
                          <Github size="24" />
                          <Text weight="semibold">Login with Github</Text>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login with your GitHub account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="w-full h-[48px] space-x-[10px]"
                          onClick={() => signIn("instagram")}
                        >
                          <Instagram size="24" />
                          <Text weight="semibold">Login with Instagram</Text>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login with your Instagram account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative flex items-center justify-center w-full py-[24px]">
            <div className="absolute w-full h-[1px] bg-grayscale-70 -z-0"></div>
            <Text
              size="sm"
              weight="medium"
              className="!text-grayscale-70 bg-background z-10 px-[14px]"
            >
              Or login with
            </Text>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="space-y-[20px]">
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
                          autoFocus
                          {...field}
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
                <Button
                  variant="link"
                  className="!containerp-0 h-min w-full text-end"
                  type="button"
                  onClick={() => setStep("forgot")}
                >
                  <Text
                    className="w-full !text-primary"
                    size="sm"
                    weight="semibold"
                  >
                    Forgot Password
                  </Text>
                </Button>
              </div>
              <div className="space-y-[24px]">
                <Button
                  type="submit"
                  className="w-full h-[58px] text-[18px] font-inter font-semibold leading-[26px] tracking-[0.09px] text-grayscale-10"
                >
                  Login
                </Button>
                <Text
                  className="w-full text-center"
                  size="md"
                  weight="semibold"
                >
                  Don’t have an account?{" "}
                  <button
                    className="text-primary focus-visible:ring-2 outline-none"
                    type="button"
                    onClick={() => setStep("signup")}
                  >
                    Register
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

export default Login;
