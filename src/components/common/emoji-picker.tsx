'use client'

import { Smile } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

interface Props {
  onChange: (value: string) => void
}

const EmojiPicker: React.FC<Props> = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className='text-zinc-400 hover:text-zinc-300 transition' />
      </PopoverTrigger>
      <PopoverContent
        side='right'
        sideOffset={40}
        className='bg-transparent border-none shadow-none drop-shadow-none mb-16'>
        <Picker
          theme='dark'
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
export default EmojiPicker
