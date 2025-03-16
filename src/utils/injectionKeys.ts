import type { InjectionKey } from 'vue'

export interface MenuInjectionOptions {
  menuOpen: Ref<boolean>
  toggleMenu: () => void
}

export const menuKey = Symbol() as InjectionKey<MenuInjectionOptions>
