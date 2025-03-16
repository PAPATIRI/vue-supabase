<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { profile } = storeToRefs(useAuthStore())

const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house',
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2',
  },
  {
    title: 'Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check',
  },
]
const accountLinks = computed(() => {
  return [
    {
      title: 'Profile',
      to: `users/${profile.value?.username}`,
      icon: 'lucide:user',
    },
    {
      title: 'Sign Out',
      icon: 'lucide:log-in',
    },
  ]
})

const router = useRouter()
const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logout } = await import('@/utils/supabaseAuth')
    const isLoggedOut = await logout()

    if (isLoggedOut) router.push('/login')
  }
}

defineEmits(['taskClicked'])
</script>
<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="$emit('taskClicked')"> Task </DropdownMenuItem>
            <DropdownMenuItem>Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideNavbarLink :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideNavbarLink :links="accountLinks" @action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
