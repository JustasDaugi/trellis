<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
import { isLoggedIn } from '@/stores/user'
</script>

<template>
  <div class="dark:bg-gray-800 min-h-screen flex items-center justify-center">
    <div v-if="!isLoggedIn" class="rounded-md bg-white px-6 py-8">
      <div class="items-center lg:flex">
        <div class="lg:w-1/2 flex flex-col items-center">
          <!-- Removed the h2 header -->

          <!-- Updated paragraph -->
          <p class="mt-4 text-gray-500 dark:text-gray-400 text-center font-bold italic font-poppins whitespace-nowrap">
            Drive success with your team, anytime.
          </p>

          <!-- Buttons centered -->
          <div class="mt-6 flex flex-col items-center gap-2">
            <FwbButton class="w-56 text-center" component="RouterLink" tag="router-link" href="/signup">
              Sign Up
            </FwbButton>
            <FwbButton
              class="w-48 text-center"
              component="RouterLink"
              tag="router-link"
              color="alternative"
              href="/login"
            >
              Log In
            </FwbButton>
          </div>
        </div>
        <div class="mt-8 lg:mt-0 lg:w-1/2">
          <div class="flex items-center justify-center lg:justify-end">
            <div class="max-w-lg">
              <!-- Image placeholder (commented out) -->
              <!-- <picture>
                  <source srcset="../assets/illustration.webp" type="image/webp" />
                  <img
                    class="h-64 w-full rounded-md object-cover object-center"
                    src="../assets/illustration.png"
                    alt="Community illustration"
                  />
                </picture> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
