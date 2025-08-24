<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        class="min-h-screen !bg-gray-50"
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <AppLogo
          class="justify-center my-4 text-xl"
          :collapsed="collapsed"
        />
        <AppMenu :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout>
        <RouterView v-slot="{ Component }">
          <div class="flex flex-col gap-4 px-4 py-4">
            <AppBreadcrumbs
              v-if="currentComponent && currentComponent.breadcrumbs"
              :breadcrumbs="currentComponent.breadcrumbs"
            />

            <component
              :is="Component"
              ref="currentComponent"
            />
          </div>
        </RouterView>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/composables/useUserStore'
import { useAuthStore } from '@/composables/useAuthStore'
import AppLogo from '@/components/AppLogo.vue'
import AppMenu from '@/components/AppMenu.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import { PageExpose } from '@/types'

const authStore = useAuthStore()
const userStore = useUserStore()

const collapsed = ref(false)
const currentComponent = ref()

watch(currentComponent, (component: PageExpose | null) => {
  document.title = component
    ? `${component.title} - ${import.meta.env.VITE_APP_NAME}`
    : import.meta.env.VITE_APP_NAME
})

onMounted(() => {
  if (authStore.loggedIn.value) {
    userStore.getCurrentUser()
  }
})
</script>
