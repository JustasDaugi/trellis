<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import useErrorMessage from '@/composables/useErrorMessage'

const route = useRoute()

const isDialogOpen = ref(false)
const emailAddress = ref('')

const openDialog = () => {
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const [shareBoard, shareErrorMessage] = useErrorMessage(async () => {
  try {
    if (emailAddress.value.trim()) {
      const boardId = Number(route.params.id) // Retrieve boardId from the URL
      if (isNaN(boardId)) {
        throw new Error('Invalid board ID')
      }

      const response = await trpc.board.share.mutate({
        boardId: boardId,
        email: emailAddress.value.trim(),
      })
      console.log('Board shared successfully:', response)
      closeDialog()
    }
  } catch (error) {
    console.log('Board share failed:', error)
    throw error
  }
})

const share = async () => {
  await shareBoard()
}
</script>

<template>
  <div>
    <button
      @click="openDialog"
      class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      Share
    </button>
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div class="relative z-[1001] w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 class="mb-4 text-xl font-bold">Shared via Gmail</h2>
        <div class="mb-4">
          <label for="email-address" class="mb-2 block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email-address"
            v-model="emailAddress"
            type="email"
            class="focus:border-orchid-500 focus:ring-orchid-500 block w-full rounded-md border-gray-300 shadow-sm"
            required
            placeholder="Enter email address"
          />
        </div>
        <p v-if="shareErrorMessage" class="mt-2 text-sm text-red-500">{{ shareErrorMessage }}</p>
        <div class="mt-4 flex justify-end">
          <button
            class="mr-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            @click="closeDialog"
          >
            Cancel
          </button>
          <button
            class="bg-orchid-500 hover:bg-orchid-600 rounded-md px-4 py-2 text-black font-bold"
            @click="share"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
