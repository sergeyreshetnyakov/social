<template>
  <Form @submit="submit" :validation-schema="registerSchema" class="auth">
    <h1 class="text-lg font-semibold flex justify-center">Login</h1>

    <Field name="email" class="auth-field" placeholder="E-mail" />
    <ErrorMessage name="email" class="auth-error" />

    <Field name="password" class="auth-field" placeholder="Password" />
    <ErrorMessage name="password" class="auth-error" />

    <button class="button-solid mt-6" type="submit">Submit</button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import useUserStore from '../features/userStore.ts'
import * as yup from 'yup'

const store = useUserStore()

const registerSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})

function submit(values) {
  store.login(values)
}
</script>
