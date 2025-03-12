import {
  taskQuery,
  taskWithProjectsQuery,
  updateTaskQuery,
  type Task,
  type TaskWithProjects,
} from '@/utils/supabaseQuery'
import { useMemoize } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useErrorStore } from '../error'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TaskWithProjects | null>(null)
  const task = ref<Task | null>(null)

  const loadTasks = useMemoize(
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (id: string) => await taskWithProjectsQuery,
  )
  const laodTask = useMemoize(async (slug: string) => await taskQuery(slug))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof taskWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof laodTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value.data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks('tasks')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) tasks.value = data

    validateCache({
      ref: tasks,
      query: taskWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const getTask = async (id: string) => {
    task.value = null
    const { error, data, status } = await laodTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) task.value = data

    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: laodTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  return {
    tasks,
    getTasks,
    getTask,
    task,
    updateTask,
  }
})
