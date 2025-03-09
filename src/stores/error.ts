import type { CustomError, EXtendedPostgresError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | EXtendedPostgresError>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'Unknown error'
      const customError: CustomError = {
        ...new Error(errorMessage),
        customCode: customCode || 500,
      }

      activeError.value = customError
      return
      // activeError.value = typeof error === 'string' ? Error(error) : error
      // activeError.value.customCode = customCode || 500
      // return
    }
    // jika error dari supabase
    const PostgrestError: EXtendedPostgresError = {
      ...(error as PostgrestError),
      statusCode: customCode || 500,
    }

    activeError.value = PostgrestError

    // activeError.value = error
    // activeError.value.statusCode = customCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
