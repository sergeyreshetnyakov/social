<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import useUserStore from '@/shared/api/userStore'
import { ref } from 'vue'

const user = useUserStore()
const userLink = ref<string>("none")

const { isLogedIn, data: userData } = storeToRefs(user)

if (userData.value) userLink.value = userData.value?.username

</script>

<template>
  <nav>
    <router-link to="/" class="pretty-link">Home</router-link>
    <div>
      <div v-if="!isLogedIn" class="flex gap-3">
        <router-link to="/login" class="button-solid">Login</router-link>
        <router-link to="/register" class="button-outline">Register</router-link>
      </div>
      <div v-else class="flex gap-3">
        <div class="my-auto">
          <router-link to="/post" class="button-inline mr-4 hover:bg-green-300">
            <i class="pi pi-pen-to-square text-xl py-2 px-2"></i>
          </router-link>
        </div>
        <div
          class="my-auto font-semibold underline underline-offset-3 decoration-[1.5px] decoration-white duration-300 ease-in-out hover:decoration-zinc-800"
        >
          <router-link :to="userLink">{{ userData?.username }}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
