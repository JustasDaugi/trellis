<script lang="ts" setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { trpc } from '@/trpc'
import useErrorMessage from '@/composables/useErrorMessage'
import Buttons from './Buttons.vue'
import type { CardPublic } from '@server/shared/types'

const props = defineProps<{
  card: CardPublic
}>()

const emit = defineEmits<{
  (e: 'update-card'): void
  (e: 'delete-card'): void
}>()

const isDialogOpen = ref(true)
const isDeleteMessageVisible = ref(false)
const cardTitle = ref(props.card.title)
const cardDescription = ref(props.card.description || '')

const closeDialog = () => {
  isDialogOpen.value = false
}

const [updateCard, updateErrorMessage] = useErrorMessage(async () => {
  if (cardTitle.value.trim()) {
    await trpc.card.update.mutate({
      id: props.card.id,
      title: cardTitle.value.trim(),
      description: cardDescription.value.trim(),
    })
    emit('update-card')
    closeDialog()
  }
})

const confirmUpdate = async () => {
  await updateCard()
}

const [deleteCard, deleteErrorMessage] = useErrorMessage(async () => {
  await trpc.card.deleteById.mutate({ id: props.card.id })
  emit('delete-card')
  closeDialog()
})

const confirmDelete = async () => {
  await deleteCard()
}

const toggleDeleteMessage = () => {
  isDeleteMessageVisible.value = !isDeleteMessageVisible.value
}
</script>

<template>
  <div>
    <transition name="fade">
      <div
        v-if="isDialogOpen"
        class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="w-96 scale-95 transform rounded-md bg-white p-6 shadow-lg transition-transform">
          <h3 class="mb-4 text-lg font-semibold">Manage Card</h3>
          <div class="mb-6">
            <h4 class="text-md mb-2 font-semibold">Edit Card</h4>
            <label class="mb-4 block">
              <span class="text-gray-700">Title</span>
              <input
                v-model="cardTitle"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </label>
            <label class="mb-4 block">
              <span class="text-gray-700">Description</span>
              <textarea
                v-model="cardDescription"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              ></textarea>
            </label>
            <p v-if="updateErrorMessage" class="mb-4 text-sm text-red-500">
              {{ updateErrorMessage }}
            </p>
          </div>
          <div class="mb-4" v-if="isDeleteMessageVisible">
            <p>Are you sure you want to delete this card?</p>
            <p v-if="deleteErrorMessage" class="mt-2 text-sm text-red-500">
              {{ deleteErrorMessage }}
            </p>
          </div>

          <Buttons
            :onClose="closeDialog"
            :onUpdate="confirmUpdate"
            :onDelete="confirmDelete"
            :isDeleteMessageVisible="isDeleteMessageVisible"
            @toggle-delete-message="toggleDeleteMessage"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
