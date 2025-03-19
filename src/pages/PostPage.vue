<template>
  <div :v-if="isLoaded">
    <post-item v-if="postData" v-bind="postData"/>
    <div class="mt-16">
      <create-comment v-if="postData" :_id="postData._id" />
      <div v-if="postData">
        <comment-item
          v-for="comment in postData.comments"
          v-bind="comment"
          :key="comment._id"
          :postId="postData._id"
        />
      </div>
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

const isLoaded = ref<boolean>(false)
const postData = ref<post>()

post.getById(route.params.postId as string).then((res) => {
  if(res) postData.value = res
  isLoaded.value = true
})
</script>
