import type { PostgrestError } from '@supabase/supabase-js'

export interface CustomError extends Error {
  customCode?: number
}

export interface EXtendedPostgresError extends PostgrestError {
  statusCode?: number
}

export const isExtendedPostgresError = (error: Error): error is EXtendedPostgresError => {
  return error && typeof error === 'object' && 'message' in error && 'statusCode' in error
}
