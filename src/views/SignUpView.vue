<script lang="ts" setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { FormData } from '@/stores/user'

const userStore = useUserStore()
const formData = reactive<FormData>({
  name: '',
  email: '',
  password: ''
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  userStore.handleSignUp(formData)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <main class="py-8">
    <div class="flex items-center justify-center">
      <div class="wrapper w-full bg-white px-10 py-6">
        <h1 class="title text-center">Sign Up</h1>
        <a-form
          :model="formData"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="name"
            :rules="[
              { required: true, message: 'Please input your name!' },
              { min: 3, message: 'Name must be at least 3 characters' }
            ]"
          >
            <a-input v-model:value="formData.name" placeholder="name" />
          </a-form-item>

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
            <a-button class="button w-full" html-type="submit">Create Account</a-button>
          </a-form-item>
        </a-form>
        <router-link :to="{ name: 'Signin' }" class="block text-center"
          >Already have an account? Sign In</router-link
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  max-width: 400px;
}
</style>
