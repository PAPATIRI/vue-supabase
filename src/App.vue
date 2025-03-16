<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import { useErrorStore } from './stores/error'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error, customCode: 500 })
})

onMounted(async () => {
  useAuthStore().trackAuthChanges()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
