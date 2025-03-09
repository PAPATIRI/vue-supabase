import supabase from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const taskWithProjectsQuery = supabase.from('tasks').select(`*, projects(id, name, slug)`)

export type TaskWithProjects = QueryData<typeof taskWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `*,
  tasks(id, name, status, due_date)`,
    )
    .eq('slug', slug)
    .single()

export const taskQuery = (id: number) => {
  return supabase.from('tasks').select(`*, projects(id, name, slug)`).eq('id', id).single()
}

export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>>
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = (id: string) => {
  return supabase.from('profiles').select().eq('id', id).single()
}
