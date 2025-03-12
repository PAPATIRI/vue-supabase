<script lang="ts" setup>
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/tasksColumns'
import { storeToRefs } from 'pinia'

usePageStore().pageData.title = 'Task Page'

const taskLoader = useTasksStore()
const { tasks } = storeToRefs(taskLoader)
const { getTasks } = taskLoader
await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>
<template>
  <div>
    <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
  </div>
</template>

<style lang=""></style>
