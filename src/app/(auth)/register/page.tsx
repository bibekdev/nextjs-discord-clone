'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
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
import { SubmitHandler, useForm } from 'react-hook-form'

type PageProps = {}

const formSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }),
  fullName: z.string(),
  password: z.string(),
})

const Page: React.FC<PageProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async values => {}

  return (
    <Card className='w-[500px] bg-[#313338]'>
      <CardHeader className=''>
        <CardTitle className='text-xl font-bold text-center text-white'>
          Create an account
        </CardTitle>
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
              name='fullName'
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel className='text-white'>Full Name</FormLabel>
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
        Already have an account?{' '}
        <Link href='/login' className='text-[#00a8fc] ml-1'>
          Login
        </Link>{' '}
      </CardFooter>
    </Card>
  )
}
export default Page
