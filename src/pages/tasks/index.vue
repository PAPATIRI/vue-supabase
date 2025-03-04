<script lang="ts" setup>
import { usePageStore } from '@/stores/page'
import { taskWithProjectsQuery, type TaskWithProjects } from '@/utils/supabaseQuery'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Task Page'

const tasks = ref<TaskWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await taskWithProjectsQuery

  if (error) console.log(error)

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
