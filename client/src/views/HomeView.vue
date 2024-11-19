<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
import { isLoggedIn } from '@/stores/user'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center dark:bg-gray-800">
    <div v-if="!isLoggedIn" class="rounded-md bg-white px-6 py-8">
      <div class="flex flex-col items-center">
        <p
          class="mt-4 whitespace-nowrap text-center font-poppins font-bold italic text-gray-500 dark:text-gray-400"
        >
          Drive success with your team, anytime.
        </p>

        <div class="mb-40 mt-6 flex flex-col items-center gap-2">
          <FwbButton
            class="w-72 text-center"
            component="RouterLink"
            tag="router-link"
            href="/signup"
            size="xl"
          >
            Sign Up
          </FwbButton>
          <FwbButton
            class="w-72 text-center"
            component="RouterLink"
            tag="router-link"
            color="alternative"
            href="/login"
            size="xl"
          >
            Log In
          </FwbButton>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-center">
        <div class="max-w-lg">
          <!--
          <picture>
            <source srcset="../assets/illustration.webp" type="image/webp" />
            <img
              class="h-64 w-full rounded-md object-cover object-center"
              src="../assets/illustration.png"
              alt="Community illustration"
            />
          </picture>
          -->
        </div>
      </div>
    </div>
  </div>
</template>
