"use client";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
// import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  user_id: z.string(),
  message: z.string().min(2).max(500),
  image: z.string().url(),
  url: z.string().url(),
});

interface IUsers {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  verified: boolean;
  image: string;
}
const NotificationsPage = () => {
  // const {data} = useSession()
  const [users, setUsers] = useState<IUsers[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      user_id: "",
      message: "",
      image: "",
      url: "",
    },
  });
  useEffect(() => {
    if (!value) {
      setError("Please select a user");
    } else {
      setError(null);
    }
  }, [value]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data: { payload: IUsers[] }) => setUsers(data.payload));
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!value) {
      setError("Please select a user");
      return;
    }
    values = { ...values, user_id: value };
    fetch("/api/admin/notifications", {
      method: "POST",
      body: JSON.stringify(values),
    });
  }
  return (
    <div className="px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Text className="mt-10">User:</Text>
          <div className="flex w-full flex-col">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={!error ? "secondary" : "destructive"}
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between rounded-none w-full !mt-2"
                  ref={triggerRef}
                >
                  {value
                    ? users.find((user) => user._id === value)?.fullName
                    : "Select user"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "w-[200px] p-0 rounded-none",
                  triggerRef.current?.offsetWidth &&
                    `min-w-[${triggerRef.current.offsetWidth}px]`
                )}
                style={{ width: triggerRef.current?.offsetWidth || "200px" }}
              >
                <Command>
                  <CommandInput placeholder="Search users..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          className="rounded-none"
                          key={user._id}
                          value={user.fullName}
                          onSelect={(currentValue) => {
                            currentValue = users.find(
                              (user) => user.fullName === currentValue
                            )?._id as string;
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {user.fullName}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === user._id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {error && (
              <Text
                size="md"
                weight="medium"
                className="mt-1 !text-destructive"
              >
                {error}
              </Text>
            )}
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter notification title"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter notification description"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter notification link"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Photo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter notification photo url"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsPage;
