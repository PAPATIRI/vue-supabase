import type { CustomError, EXtendedPostgresError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | EXtendedPostgresError>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
