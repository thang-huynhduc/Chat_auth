import * as z from 'zod'

export const LoginSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters" })
  })

export const RegisterSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Email is required!" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
      message: "Password must include letters and numbers"
    }),
})
export const emailSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP phải có 6 ký tự'),
});
export const changePasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  oldPassword: z.string().min(6, 'Mật khẩu cũ không hợp lệ'),
  newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
});

export const updateInfoSchema = z.object({
  // Thêm các trường tùy thuộc vào yêu cầu, ví dụ:
  username: z.string().min(3, 'Username phải có ít nhất 3 ký tự').optional(),
  email: z.string().email('Email không hợp lệ').optional(),
});
