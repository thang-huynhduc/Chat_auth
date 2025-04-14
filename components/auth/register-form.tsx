"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendOTP, verifyOTP, signUp } from "@/lib/api";
import { emailSchema, otpSchema, RegisterSchema } from "@/schemas";
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

export default function SignUpPage() {
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

  // Form cho bước 3: Nhập username và password
  const signUpForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { 
      username: "",
      password: "" },
  });

  // Xử lý gửi OTP (Bước 1)
  const handleSendOTP = (values: z.infer<typeof emailSchema>) => {
    startTransition(async () => {
      try {
        const result = await sendOTP(values.email);
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
          signUpForm.reset({ email, username: "", password: "" });
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

  // Xử lý đăng ký (Bước 3)
  const handleSignUp = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      try {
        const result = await signUp(values.username, email, values.password);
        console.log("Kết quả từ signUp:", result);
        if (result.success) {
          toast.success("Đăng ký thành công!");
          window.location.href = "/login";
        } else {
          toast.error(result.error || "Đăng ký thất bại");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi đăng ký");
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
    >
      {/* Bước 1: Nhập email */}
      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleSendOTP)}
            className="space-y-6"
          >
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
          <form
            onSubmit={otpForm.handleSubmit(handleVerifyOTP)}
            className="space-y-6"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="XXXXXX"
                    />
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

      {/* Bước 3: Nhập username và password */}
      {step === 3 && (
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(handleSignUp)}
            className="space-y-6"
          >
            <FormField
              control={signUpForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nhập username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="password"
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
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
}