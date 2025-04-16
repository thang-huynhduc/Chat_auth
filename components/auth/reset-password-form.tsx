"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifyOTP, resetPasswordGetOTP, resetPassword } from "@/lib/api";
import { emailSchema, otpSchema } from "@/schemas";
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
import { toast } from "sonner";

// Schema cho reset password
const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export default function ResetPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  // Form cho bước 1: Nhập email
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Form cho bước 2: Nhập OTP
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Form cho bước 3: Nhập password
  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  // Xử lý gửi OTP (Bước 1)
  const handleSendOTP = (values: z.infer<typeof emailSchema>) => {
    startTransition(async () => {
      try {
        const result = await resetPasswordGetOTP(values.email);
        if (result.success) {
          setEmail(values.email);
          setStep(2);
          toast.success("OTP đã được gửi!");
        } else {
          toast.error(result.error || "Gửi OTP thất bại");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi gửi OTP");
      }
    });
  };

  // Xử lý xác thực OTP (Bước 2)
  const handleVerifyOTP = (values: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      try {
        const result = await verifyOTP(email, values.otp);
        if (result.success) {
          setStep(3);
          toast.success("OTP xác thực thành công!");
        } else {
          toast.error(result.error || "Xác thực OTP thất bại");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi xác thực OTP");
      }
    });
  };

  // Xử lý reset mật khẩu (Bước 3)
  const handleReset = (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      try {
        const result = await resetPassword(email, values.newPassword);
        console.log("Kết quả từ resetPassword:", result);
        if (result.success) {
          toast.success("Reset Password Successful!");
          window.location.href = "/login";
        } else {
          toast.error(result.error || "Reset mật khẩu thất bại");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi reset mật khẩu");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel={
        step === 1
          ? "Enter your email"
          : step === 2
          ? "Enter your OTP"
          : "Finish soon!"
      }
      backButtonLabel="Back to login?"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      {/* Bước 1: Nhập email */}
      {step === 1 && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleSendOTP)} className="space-y-6">
            <FormField
              control={emailForm.control}
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
            <Button type="submit" className="w-full" disabled={isPending}>
              Send OTP
            </Button>
          </form>
        </Form>
      )}

      {/* Bước 2: Nhập OTP */}
      {step === 2 && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-6">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="XXXXXX" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Verify
            </Button>
          </form>
        </Form>
      )}

      {/* Bước 3: Nhập password */}
      {step === 3 && (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-6">
            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nhập password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset Password
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
}