import { AudioFileSchema } from '@/features/audio/schema/audioFileSchema'

export function validateAudioFile(file: File | undefined): {
  isValid: boolean
  error: string
} {
  if (!file) {
    return { isValid: false, error: 'No file selected.' }
  }

  const result = AudioFileSchema.safeParse(file)

  if (result.success) return { isValid: true, error: '' }

  const issue = result.error.issues[0]

  return {
    isValid: false,
    error: issue?.message ?? 'Unknown error.',
  }
}
