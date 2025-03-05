<script lang="ts" setup>
import { useErrorStore } from '@/stores/error'
import { usePageStore } from '@/stores/page'
import { taskWithProjectsQuery, type TaskWithProjects } from '@/utils/supabaseQuery'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Task Page'

const tasks = ref<TaskWithProjects | null>(null)
const getTasks = async () => {
  const { data, error, status } = await taskWithProjectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}
await getTasks()
</script>
<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>

<style lang=""></style>
