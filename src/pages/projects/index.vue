<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { usePageStore } from '@/stores/page'
import { projectsQuery, type Projects } from '@/utils/supabaseQuery'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects Page'

const projects = ref<Projects | null>(null)
const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  projects.value = data
}
await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
