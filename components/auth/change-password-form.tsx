"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { changePassword } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { changePasswordSchema } from "@/schemas";


export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Khởi tạo form
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  // Xử lý đổi mật khẩu
  const handleChangePassword = (values: z.infer<typeof changePasswordSchema>) => {
    startTransition(async () => {
      try {
        const result = await changePassword(values.email, values.oldPassword, values.newPassword);
        if (result.success) {
          toast.success("Đổi mật khẩu thành công!");
          router.push("/auth/login");
        } else {
          toast.error(result.error || "Đổi mật khẩu thất bại");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi đổi mật khẩu");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Đổi mật khẩu"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChangePassword)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="example@exam.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Nhập mật khẩu cũ"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Nhập mật khẩu mới"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Đổi mật khẩu
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}