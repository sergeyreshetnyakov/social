<template>
  <div :v-if="isLoaded">
    <post-item v-bind="postData" :hidden="false" />
    <div class="mt-16">
      <create-comment :_id="postData._id" />
      <comment-item
        v-for="comment in postData?.comments"
        :key="comment._id"
        v-bind="comment"
        :postId="postData._id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePostStore, { type post } from '@/shared/api/postStore'
import PostItem from '@/entities/PostItem.vue'
import CommentItem from '@/entities/CommentItem.vue'
import CreateComment from '@/widgets/CreateComment.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const post = usePostStore()
const route = useRoute()

const postData = ref<post>()
const isLoaded = ref<boolean>(false)

post.getById(route.params.postId as string).then((res) => {
  postData.value = res
})
</script>
