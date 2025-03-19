<template>
  <form @submit="onSubmit">
      <textarea
        placeholder="Write something"
        class="w-full h-[7vh] p-2 outline-none border-2 border-zinc-400 rounded-lg"
        v-model="content"
        v-bind="contentAttrs"
      ></textarea>
      <label>{{ errors.content }}</label>
      <button class="button-inline hover:bg-blue-300 w-[10vw]" type="submit">
        <i class="pi pi-plus text-xl mt-1"></i>
      </button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup';
import useCommentStore from '@/shared/api/commentStore'
import * as yup from 'yup'

const props = defineProps<{ _id: string }>()

const {handleSubmit, defineField, errors} = useForm({
  validationSchema: toTypedSchema(yup.object({
    content: yup.string().required().min(10),
  }))
})

const [content, contentAttrs] = defineField("content")

const comment = useCommentStore()

const onSubmit = handleSubmit(submitted => {
  comment.create(props._id, submitted)
})

</script>
