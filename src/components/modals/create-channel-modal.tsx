'use client'

import * as z from 'zod'
import qs from 'query-string'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChannelType } from '@prisma/client'
import { useModal } from '@/hooks/use-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required',
    })
    .refine(name => name !== 'general'),
  type: z.nativeEnum(ChannelType),
})

const CreateChannelModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { channelType },
  } = useModal()
  const router = useRouter()
  const params = useParams()

  const isModalOpen = isOpen && type === 'createChannel'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channelType) {
      form.setValue('type', channelType)
    } else {
      form.setValue('type', ChannelType.TEXT)
    }
  }, [channelType, form])

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async values => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      })
      await axios.post(url, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=''>
        <DialogHeader className='pt-8'>
          <DialogTitle className='text-center text-xl font-bold'>
            Create a new channel
          </DialogTitle>
          <DialogDescription className='text-center'>
            Your channel is where you and your friends talk about topic. Make
            yours and start talking.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-base font-semibold'>
                    Channel Name
                  </FormLabel>
                  <FormControl>
                    <Input className='bg-zinc-300 text-black' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name='type'
              control={form.control}
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Channel Type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder='Select a channel type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ChannelType).map(type => (
                        <SelectItem
                          key={type}
                          value={type}
                          className='capitalize'>
                          {type.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='primary'
              className='w-full mt-10'
              disabled={isLoading}
              size='lg'>
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateChannelModal
