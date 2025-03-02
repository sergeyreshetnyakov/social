<template>
  <Form @submit="submit" :validation-schema="registerSchema" class="auth">
    <h1 class="text-lg font-semibold flex justify-center">Login</h1>

    <Field name="username" class="auth-field" placeholder="Username" />
    <ErrorMessage name="username" class="auth-error" />

    <Field name="password" class="auth-field" placeholder="Password" />
    <ErrorMessage name="password" class="auth-error" />

    <button class="button-solid mt-6" type="submit">Submit</button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import useUserStore from '@/shared/api/userStore.ts'
import * as yup from 'yup'

const user = useUserStore()

const registerSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(8),
})

function submit(values) {
  user.login(values)
}
</script>
