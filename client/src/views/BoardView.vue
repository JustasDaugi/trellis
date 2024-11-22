<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddListButton from '../components/BoardView/AddListButton.vue'
import ThreeVerticalDots from '../components/BoardView/ThreeVerticalDots.vue'
import { useBackgroundImage } from '@/utils/fetchImage'
import type { ListPublic, BoardPublic } from '@server/shared/types'

const route = useRoute()
const router = useRouter()
const board = ref<BoardPublic | null>(null)
const lists = ref<ListPublic[]>([])

const boardId = Number(route.params.id)

onBeforeMount(async () => {
  try {
    const boardFound = await trpc.board.get.query(boardId)
    if (boardFound) {
      board.value = boardFound
    } else {
      console.error('Board not found')
    }
    await fetchLists()
  } catch (error) {
    console.error('Error fetching board or lists:', error)
  }
})

const fetchLists = async () => {
  try {
    const fetchedLists = await trpc.list.find.mutate({ boardId })
    lists.value = fetchedLists
  } catch (error) {
    console.error('Error fetching lists:', error)
  }
}

const renderList = (newList: ListPublic) => {
  lists.value.push(newList)
}

function navigateToMainView() {
  router.push({ name: 'MainView' })
}

const { backgroundImageUrl } = useBackgroundImage(board)
</script>

<template>
  <div
    v-if="board"
    :style="{
      backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="relative min-h-screen"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="relative flex items-center justify-between bg-transparent p-4">
        <div class="flex items-center">
          <button class="text-white" @click="navigateToMainView">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="ml-4 text-white">{{ board.title }}</h1>
        </div>
        <ThreeVerticalDots />
      </div>
      <main class="mt-8 p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="list in lists"
            :key="Number(list.id)"
            class="relative rounded-lg bg-black bg-opacity-25 p-4 text-white shadow-md"
          >
            <h2 class="mb-2 truncate text-lg font-semibold text-white hover:text-blue-300">
              {{ list.title }}
            </h2>
            <ThreeVerticalDots class="absolute right-4 top-4 text-white focus:outline-none" />
            <button
              class="mt-4 text-sm font-medium text-blue-400 hover:underline focus:outline-none"
            >
              + Add card
            </button>
          </div>
          <AddListButton @list-created="renderList" />
        </div>
      </main>
    </div>
  </div>

  <div v-else>
    <p class="mt-10 text-center text-gray-500">Loading board...</p>
  </div>
</template>
