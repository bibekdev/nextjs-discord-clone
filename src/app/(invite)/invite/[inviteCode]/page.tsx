'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const router = useRouter()

  const onClick = async () => {
    const { data } = await axios.patch(`/api/invite/${params?.inviteCode}`)
    console.log(data)
    router.push(`/servers/${data.id}`)
  }

  return (
    <Card className='w-[500px] bg-[#313338]'>
      <CardHeader className=''>
        <CardTitle className='text-xl font-bold text-center text-white'>
          Invitation Code
        </CardTitle>
        <CardDescription className='text-center text-gray-400'>
          Would you like to to join the server?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className='mt-10 w-full'
          variant='primary'
          size='lg'
          onClick={onClick}>
          Join now
        </Button>
      </CardContent>
    </Card>
  )
}

export default Page
