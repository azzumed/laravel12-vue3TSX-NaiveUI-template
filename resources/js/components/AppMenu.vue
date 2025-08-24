<template>
  <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="24" :options="menuOptions" />
</template>

<script setup lang="tsx">
import { Component, h, ref, watch } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import { Home24Filled, SignOut24Filled } from '@vicons/fluent'
import { RouterLink, useRoute } from 'vue-router'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()

const activeKey = ref<string | null>(null)

const setActiveKey = () => {
  activeKey.value = String(route.name)
}

watch(() => route.name, setActiveKey)
setActiveKey()

const renderLabel = (text: string, name: string) => {
  return () => <RouterLink to={{ name: name }}>{text}</RouterLink>
}

const renderIcon = (icon: Component) => {
  return () => <NIcon>{h(icon)}</NIcon>
}

const menuOptions: MenuOption[] = [
  {
    label: renderLabel('Home', 'home'),
    key: 'home',
    icon: renderIcon(Home24Filled),
  },
  {
    label: renderLabel('Logout', 'logout'),
    key: 'logout',
    icon: renderIcon(SignOut24Filled),
  },
]
</script>
