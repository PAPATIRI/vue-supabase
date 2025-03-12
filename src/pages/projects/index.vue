<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useProjectsStore } from '@/stores/loaders/projects'
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { storeToRefs } from 'pinia'

usePageStore().pageData.title = 'Projects Page'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader
await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
