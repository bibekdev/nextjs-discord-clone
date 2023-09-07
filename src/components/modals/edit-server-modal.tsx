'use client'

import { useModal } from '@/hooks/use-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { FileUpload } from '../common/file-upload'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

const EditServerModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'editServer'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [form, server])

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async values => {
    await axios.patch(`/api/servers/${server?.id}`, values)
    form.reset()
    router.refresh()
    onClose()
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
            Edit a server
          </DialogTitle>
          <DialogDescription className='text-center'>
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6'>
            <div className='flex items-center justify-center'>
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint='serverImage'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='mt-6'>
                  <FormLabel className='uppercase text-base font-semibold'>
                    Server name
                  </FormLabel>
                  <FormControl>
                    <Input className='bg-zinc-300 text-black' {...field} />
                  </FormControl>
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
export default EditServerModal
