import type { CustomError } from '@/types/Error'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null)

  const setError = ({ error, customCode }: { error: string; customCode: number }) => {
    activeError.value = Error(error)
    activeError.value.customCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
