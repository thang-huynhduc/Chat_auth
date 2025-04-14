"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { RegisterSchema } from '@/schemas'
import { signUp } from '@/lib/api'
import { toast } from 'sonner'

const RegisterForm = () => {
  const [ isPending, startTransition ] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  })
  

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      try {
        const result = await signUp(values.username, values.email, values.password)
        if (result?.success) {
          toast.error('Register Thành Công');
          // window.location.href = '/auth/login';
        } else {
          toast.success('Register , Please try again')
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error('Register Failed: ' + ((error as any)?.message ?? 'Unknown error'));
      }

    })
  }

  return (
    <CardWrapper
      headerLabel="Create Account!"
      backButtonLabel="Already have an Account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((onSubmit))}
          className="space-y-6"
        >
          <div className="space-y-4">
          {/* Username */}
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
                      placeholder="John Deep"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
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
                      placeholder='thang.huynh@example.com'
                      type="email"
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
            disabled={isPending}  
          >
            Create
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
