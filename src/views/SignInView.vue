<script lang="ts" setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { FormData } from '@/api/user'
import SmallContainerSlot from '../components/Shared/SmallContainerSlot.vue'

const userStore = useUserStore()
const formData = reactive<Partial<FormData>>({
  email: '',
  password: ''
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  userStore.handleLogin(formData)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <main class="py-8">
    <small-container-slot>
      <template v-slot:title>
        <h1 class="title text-center">Sign In</h1>
      </template>
      <template v-slot:content>
        <a-form
          :model="formData"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="email"
            :rules="[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid Email' }
            ]"
          >
            <a-input v-model:value="formData.email" placeholder="email" />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formData.password" placeholder="password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button class="button w-full" html-type="submit">Sign In</a-button>
          </a-form-item>
        </a-form>
        <router-link :to="{ name: 'Signup' }" class="block text-center"
          >Don't have an account? Sign Up</router-link
        >
      </template>
    </small-container-slot>
  </main>
</template>

<style scoped></style>
