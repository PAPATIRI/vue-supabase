<script lang="ts" setup>
import type { CreateNewTask } from '@/types/CreateNewForm'
import { profilesQuery, projectsQuery } from '@/utils/supabaseQuery'

const sheetOpen = defineModel<boolean>()

type selectOption = { label: string; value: number | string }

const selectOptions = ref({
  projects: [] as selectOption[],
  profiles: [] as selectOption[],
})

const getProjectOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id,
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectOptions(), getProfilesOptions()])
}

getOptions()

const createTask = async (formData: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000)
  })
}
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetTrigger>open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit type="form" @submit="createTask" submit-label="Create Task">
        <FormKit type="text" name="name" id="name" label="Name" placeholder="My new Task" />
        <FormKit
          type="select"
          name="for"
          id="for"
          label="For"
          placeholder="Select a user"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
