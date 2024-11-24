<script lang="ts" setup>
import { ref } from 'vue'
import { trpc } from '@/trpc'
import useErrorMessage from '@/composables/useErrorMessage'
import type { ListPublic } from '@server/shared/types'

const props = defineProps<{
  list: ListPublic
}>()

const emit = defineEmits<{
  (e: 'change-name', newName: string): void
}>()

const isDialogOpen = ref(false)
const listName = ref(props.list.title)

const openDialog = () => {
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const [updateList, updateErrorMessage] = useErrorMessage(async () => {
  try {
    if (listName.value.trim()) {
      const updatedList = await trpc.list.update.mutate({
        id: props.list.id,
        title: listName.value.trim(),
      })
      console.log('List updated successfully:', updatedList)
      emit('change-name', listName.value.trim())
      closeDialog()
    }
  } catch (error) {
    console.log('List update failed:', error)
    throw error
  }
})

const changeName = async () => {
  await updateList()
}
</script>

<template>
  <div>
    <button
      @click="openDialog"
      class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      Change name
    </button>
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-96 rounded-md bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">Change Name</h3>
        <input
          v-model="listName"
          type="text"
          class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring"
        />
        <p v-if="updateErrorMessage" class="mt-2 text-sm text-red-500">{{ updateErrorMessage }}</p>
        <div class="mt-4 flex justify-end">
          <button
            class="mr-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            @click="closeDialog"
          >
            Cancel
          </button>
          <button
            class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            @click="changeName"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
