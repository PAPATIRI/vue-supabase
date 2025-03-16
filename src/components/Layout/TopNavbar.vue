<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useDark, useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const { profile } = storeToRefs(useAuthStore())

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>
    <div class="flex justify-center items-center gap-1">
      <Button @click="toggleDark()" class="w-8 h-8 mx-2">
        <transition name="scale" mode="out-in">
          <iconify-icon icon="lucide:sun" v-if="isDark"></iconify-icon>
          <iconify-icon icon="lucide:moon" v-else></iconify-icon>
        </transition>
      </Button>
      <div class="w-8">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                :src="profile.avatar_url || ''"
                :alt="`${profile.full_name} profile picture`"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RouterLink
                :to="{
                  name: '/users/[username]',
                  params: { username: profile.username },
                }"
                class="w-full h-full"
                >Profile</RouterLink
              >
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
