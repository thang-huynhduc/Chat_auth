"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'

import axios from 'axios'


const LoginForm = () => {

  const [ isPending, startTransition ] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      try {
        await axios.post('/api/auth/login', values);
      } catch (error) {
        console.error("Sign-in error:", error);
        alert("Có lỗi xảy ra khi đăng nhập.");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back to here!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((onSubmit))}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='thang.huynh@example.com'
                      type="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
