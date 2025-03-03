<script lang="ts" setup>
import supabase from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database.types'

const tasks = ref<Tables<'tasks'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.log(error)

  tasks.value = data
})()
</script>
<template>
  <div>
    <h1>tasks page</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">go to projects 1</RouterLink>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">{{ task.name }}</li>
    </ul>
  </div>
</template>

<style lang=""></style>
