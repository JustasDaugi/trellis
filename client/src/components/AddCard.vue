<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue'
import { trpc } from '@/trpc'

const props = defineProps<{
  listId: number
}>()

const emit = defineEmits(['card-created'])
const isAddingCard = ref(false)
const cardForm = ref({
  title: '',
  listId: props.listId as number,
  description: '',
})
const errorMessage = ref('')

watch(
  () => props.listId,
  (newListId) => {
    cardForm.value.listId = newListId
  }
)

const createCard = async () => {
  try {
    const { listId, title, description } = cardForm.value
    if (listId && title.trim().length >= 1) {
      const card = await trpc.card.create.mutate({
        title: title.trim(),
        listId,
        description: description.trim(),
      })
      console.log('Card created successfully:', card)
      emit('card-created', card)
      cardForm.value.title = ''
      cardForm.value.description = ''
      isAddingCard.value = false
    } else {
      console.error('List ID or card title is missing')
      errorMessage.value = 'List ID or card title is missing'
    }
  } catch (error) {
    console.log('Card creation failed:', error)
    errorMessage.value = 'Card creation failed'
  }
}

const addCardToggle = () => {
  isAddingCard.value = !isAddingCard.value
  cardForm.value.title = ''
  cardForm.value.description = ''
  errorMessage.value = ''
}
</script>

<template>
  <div>
    <button
      v-if="!isAddingCard"
      @click="addCardToggle"
      class="mt-4 text-sm font-medium text-blue-400 hover:underline focus:outline-none"
    >
      + Add card
    </button>
    <div v-else class="mt-4 flex items-center">
      <input
        v-model="cardForm.title"
        placeholder="Card name"
        class="mr-2 w-3/4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        maxlength="500"
        @keyup.enter="createCard"
      />
      <div class="flex items-center space-x-2">
        <button @click="addCardToggle" class="text-gray-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button @click="createCard" class="text-blue-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>
