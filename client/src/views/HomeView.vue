<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
import { isLoggedIn } from '@/stores/user'
</script>

<template>
  <div class="dark:bg-gray-800">
    <div v-if="!isLoggedIn" class="rounded-md bg-white px-6 py-8">
      <div class="items-center lg:flex">
        <div class="lg:w-1/2">
          <!-- <h2 class="text-4xl font-bold text-gray-800 dark:text-gray-100">Open Blogging Platform</h2> -->
          <!-- <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
            Hi! Join the community and start sharing your thoughts with the world. Sign up now
            to become a member.
          </p> -->
          <div class="mt-6 flex items-center gap-2">
            <FwbButton component="RouterLink" tag="router-link" href="/signup">Sign Up</FwbButton>
            <FwbButton component="RouterLink" tag="router-link" color="alternative" href="/login">
              Log In
            </FwbButton>
          </div>
        </div>
        <div class="mt-8 lg:mt-0 lg:w-1/2">
          <div class="flex items-center justify-center lg:justify-end">
            <div class="max-w-lg">
              <picture>
                <source srcset="../assets/illustration.webp" type="image/webp" />
                <img
                  class="h-64 w-full rounded-md object-cover object-center"
                  src="../assets/illustration.png"
                  alt="Community illustration"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
