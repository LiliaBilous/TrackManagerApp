import { z } from 'zod'

const validTypes = ['audio/mpeg', 'audio/wav']
const maxSize = 10 * 1024 * 1024

export const AudioFileSchema = z
  .instanceof(File, { message: 'Invalid file object.' })
  .refine((file) => validTypes.includes(file.type), {
    message: 'Invalid file type. Only MP3 or WAV allowed.',
  })
  .refine((file) => file.size <= maxSize, {
    message: 'File is too large. Max size is 10MB.',
  })
export type AudioFileSchema = z.infer<typeof AudioFileSchema>
