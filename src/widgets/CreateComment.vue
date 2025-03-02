<template>
  <Form @submit="submit" :validation-schema="CommentSchema">
    <Field name="content" v-slot="{ field }">
      <textarea
        placeholder="Write something"
        class="w-full h-[7vh] p-2 outline-none border-2 border-zinc-400 rounded-lg"
        v-bind="field"
      ></textarea>
    </Field>
    <ErrorMessage name="content" class="p-2" />
    <div class="flex justify-center mt-2">
      <button class="button-inline hover:bg-blue-300 w-[10vw]" type="submit">
        <i class="pi pi-plus text-xl mt-1"></i>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import usePostStore from '@/shared/api/postStore'
import * as yup from 'yup'

const props = defineProps<{ _id: string }>()
const CommentSchema = yup.object({
  content: yup.string().required().min(10),
})

const post = usePostStore()
function submit(values) {
  post.createComment(props._id, values)
}
</script>
