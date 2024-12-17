"use client";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { CameraIcon } from "@/icons";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Text from "../typography/text";

const Profile = () => {
  const input = useRef<HTMLInputElement>(null);

  const { data, update } = useSession();
  // @ts-expect-error: error not defined
  const fullName = data?.user?.fullName
    ?.split(" ")
    .map((word: string) => (word[0] ? word[0].toUpperCase() : ""))
    .join("");

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: data?.user?.email || "",
    },
  });

  // 2. Define a submit handler.
  function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.loading("Uploading...", {
      id: "uploading",
      position: "top-center",
    });
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.loading("File uploaded successfully, now update profile", {
          id: "uploading",
          position: "top-center",
        });
        fetch("/api/user/update", {
          method: "PATCH",
          body: JSON.stringify({ photo: data.payload }),
        })
          .then((response) => response.json())
          .then(() => {
            toast.success("Profile photo changed successfully", {
              id: "uploading",
              position: "top-center",
            });
          })
          .catch((error) => {
            toast.error(error.errors[0].message, {
              id: "uploading",
              position: "top-center",
            });
          })
          .finally(update);
      })
      .catch((error) => {
        toast.error(error.errors[0].message, {
          id: "uploading",
          position: "top-center",
        });
      });
  };
  return (
    <div className="p-8 w-full">
      <div className="w-[104px] h-[104px] relative">
        <Avatar className="w-full h-full ring-2 ring-line ring-offset-2 ring-offset-background">
          <AvatarImage
            src={data?.user?.image as string}
            alt={"Profile photo"}
            className="object-cover"
          />
          <AvatarFallback className="text-5xl">{fullName}</AvatarFallback>
        </Avatar>
        <button
          className="absolute bottom-0 right-0 bg-primary z-10 rounded-full p-2 border-2 border-background"
          title="Change profile photo"
          onClick={() => input.current?.click()}
        >
          <CameraIcon className="!min-w-4 !min-h-4 !text-grayscale-10" />
        </button>
        <input
          type="file"
          className="hidden"
          id="file"
          accept="image/*"
          title="Choose a file"
          ref={input}
          onChange={handleFileUpload}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onEmailSubmit)}
          className="flex w-full items-end gap-2 mt-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-grayscale-70">
                  <Text size="sm" weight="medium" className="!text-inherit">
                    Email
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={data?.user?.email || "Email"}
                    className="w-full h-[52px] rounded-3xl dark:bg-dark bg-grayscale-10 border-line pl-[12px] font-inter text-sm font-medium !leading-[22px] tracking-[0.07px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="h-[52px] text-grayscale-10">
            <Text size="md" weight="semibold" className="!text-inherit">
              Submit
            </Text>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
