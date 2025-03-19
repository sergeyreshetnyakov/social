<template>
  <form @submit="onSubmit">
    <h1 class="text-lg font-semibold flex justify-center">Create Post</h1>

    <div class="flex flex-col">
      <input
        name="title"
        placeholder="Title"
        class="outline-none p-2 border border-dashed rounded-lg"
        v-model="title"
        v-bind="titleAttrs"
      />
      <label name="title" class="p-2">{{ errors.title }}</label>
    </div>

    <div>
      <textarea
        name="content"
        placeholder="Content"
        class="w-full h-[16vh] p-2 outline-none border border-dashed rounded-lg"
        v-model="content"
        v-bind="contentAttrs"
      ></textarea>
      <label>{{ errors.content }}</label>
    </div>

    <button class="button-solid mt-6" type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import usePostStore from '@/shared/api/postStore.ts'
import * as yup from 'yup'

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      title: yup.string().required().min(3),
      content: yup.string().required().min(10).max(420),
    }),
  ),
})

const [title, titleAttrs] = defineField('title')
const [content, contentAttrs] = defineField('content')

const post = usePostStore()

const onSubmit = handleSubmit((submitted) => {
  post.create(submitted)
})
</script>
