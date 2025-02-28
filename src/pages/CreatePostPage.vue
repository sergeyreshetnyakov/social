<template>
  <Form class="flex flex-col mt-[8vh] gap-4" @submit="submit" :validation-schema="postSchema">
    <h1 class="text-lg font-semibold flex justify-center">Create Post</h1>

    <div class="flex flex-col">
      <Field
        name="title"
        placeholder="Title"
        class="outline-none p-2 border border-dashed rounded-lg"
      />
      <ErrorMessage name="title" class="p-2" />
    </div>

    <div>
      <Field name="content" v-slot="{ field }">
        <textarea
          placeholder="Content"
          v-bind="field"
          class="w-full h-[16vh] p-2 outline-none border border-dashed rounded-lg"
        ></textarea>
      </Field>
      <ErrorMessage name="content" class="p-2" />
    </div>

    <button class="button-solid mt-6" type="submit">Submit</button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import usePostStore, { type createPost } from '../shared/api/postStore.js'
import * as yup from 'yup'

const postSchema = yup.object({
  title: yup.string().required().min(3),
  content: yup.string().required().min(10),
  hidden: yup.bool().default(false),
})

const post = usePostStore()

function submit(values) {
  post.create(values)
}
</script>
