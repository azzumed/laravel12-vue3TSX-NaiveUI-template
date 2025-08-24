<template>
  <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
    <h1 class="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">Sign in to account</h1>
    <n-form ref="formRef" :model="form" :rules="rules" @submit.prevent="handleSubmit">
      <n-form-item label="Enter email" path="email">
        <n-input
          id="email"
          v-model:value="form.email"
          :input-props="{
            type: 'email',
            autocomplete: 'email',
          }"
          placeholder="Email"
        />
      </n-form-item>
      <n-form-item label="Enter password" path="password">
        <n-input
          id="password"
          v-model:value="form.password"
          :input-props="{
            autocomplete: 'current-password',
          }"
          type="password"
          placeholder="Password"
        />
      </n-form-item>
      <n-button type="primary" attr-type="submit" class="mt-6"> Sign in </n-button>
      <p class="mt-6 text-sm font-light text-gray-500">
        Don't have an account? <router-link :to="{ name: 'sign-up' }" class="text-primary-600 font-medium hover:underline"> Sign up </router-link>
      </p>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/composables/useUserStore'
import { FormRules, useMessage } from 'naive-ui'
import { reactive, ref } from 'vue'

interface FormInterface {
  email: string | null
  password: string | null
}

const userStore = useUserStore()
const message = useMessage()

const formRef = ref()

const form = reactive<FormInterface>({
  email: null,
  password: null,
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Enter email' },
    { type: 'email', message: 'Enter valid email' },
  ],
  password: { required: true, message: 'Enter password', trigger: 'blur' },
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    await userStore.authorize({
      email: form.email,
      password: form.password,
    })
  } catch {
    message.error('Please fix errors in the form')
  }
}
</script>
