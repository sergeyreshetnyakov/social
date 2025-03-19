<template>
  <form @submit="onSubmit" class="auth">
    <h1 class="text-lg font-semibold flex justify-center">Login</h1>

    <input name="username" class="auth-field" placeholder="Username" v-model="username" v-bind="usernameAttrs"/>
    <label class="auth-error">{{errors.username}}</label>

    <input name="password" class="auth-field" placeholder="Password" v-model="password" v-bind="passwordAttrs"/>
    <label class="auth-error">{{errors.password}}</label>

    <button class="button-solid mt-6" type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import useUserStore from '@/shared/api/userStore.ts'
import * as yup from 'yup'

const user = useUserStore()

const {handleSubmit, defineField, errors} = useForm({
  validationSchema: toTypedSchema(yup.object({
    username: yup.string().required(),
    password: yup.string().required().min(8),
  }))
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(submitted => {
  user.login(submitted)
})
</script>
