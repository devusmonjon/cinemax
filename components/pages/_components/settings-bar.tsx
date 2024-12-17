"use client";
import Heading from "../../typography/headings";
import Text from "../../typography/text";
import { LogoutIcon, PasswordIcon, ProfileIcon, SecurityIcon } from "@/icons";
import SettingsItem from "./settings-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";

const SettingsBar = () => {
  return (
    <div className="flex flex-col p-8 border-r border-r-line h-full max-w-[376px] w-full">
      <Heading variant="h6" weight="bold" className="pb-8">
        Profile Settings
      </Heading>
      <div className="space-y-8">
        <Text size="sm" weight="medium" className="!text-grayscale-70">
          Personal Info
        </Text>
        <SettingsItem link="profile" Icon={ProfileIcon}>
          Edit Profile
        </SettingsItem>
        <Separator className="h-[1px] w-full bg-line" />
        <SettingsItem link="password" Icon={PasswordIcon}>
          Password
        </SettingsItem>
      </div>
      <div className="space-y-8 mt-12">
        <Text size="sm" weight="medium" className="!text-grayscale-70">
          General
        </Text>
        <SettingsItem link="privacy" Icon={SecurityIcon}>
          Data Privacy
        </SettingsItem>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full h-auto py-[12px] text-alert-error border-alert-error gap-2 mt-[120px] hover:text-grayscale-10 rounded-[20px]"
            variant={"outline"}
          >
            <LogoutIcon className="!min-w-6 !min-h-6" />
            <Text size="md" weight="semibold" className="!text-inherit">
              Log Out
            </Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button variant={"secondary"} className="h-10">
                <Text size="md" weight="medium" className="!text-inherit">
                  Cancel
                </Text>
              </Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              className="h-10"
              onClick={() => signOut()}
            >
              <Text size="md" weight="medium" className="!text-inherit">
                Log Out
              </Text>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsBar;
