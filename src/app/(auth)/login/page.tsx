'use client'

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
import { useForm } from 'react-hook-form'

type PageProps = {}

const Page: React.FC<PageProps> = () => {
  const form = useForm()
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
