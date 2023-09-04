'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type PageProps = {}

const formSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }),
  password: z.string(),
})

const Page: React.FC<PageProps> = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async values => {
    await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    router.push('/')
  }

  return (
    <Card className='w-[500px] bg-[#313338]'>
      <CardHeader className=''>
        <CardTitle className='text-xl font-bold text-center text-white'>
          Welcome back!
        </CardTitle>
        <CardDescription className='text-center text-gray-400'>
          We are excited to see you again!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel className='text-white'>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className='mt-10 w-full' variant='primary' size='lg'>
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='text-white text-sm'>
        Need an account?{' '}
        <Link href='/register' className='text-[#00a8fc] ml-1'>
          Register
        </Link>{' '}
      </CardFooter>
    </Card>
  )
}
export default Page
