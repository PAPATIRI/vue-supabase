import supabase from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const taskWithProjectsQuery = supabase.from('tasks').select(`*, projects(id, name, slug)`)

export type TaskWithProjects = QueryData<typeof taskWithProjectsQuery>

export const projectQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectQuery>
