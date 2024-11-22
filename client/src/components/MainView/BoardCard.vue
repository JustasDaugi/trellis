<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import type { Selectable } from 'kysely'
import type { Board } from '@server/shared/types'

const { board } = defineProps<{
  board: Selectable<Board>
}>()

const images = import.meta.glob('@/assets/*.jpg', { eager: true })

const backgroundImages: Record<string, string> = {}
for (const path in images) {
  const imageName = path.split('/').pop()!
  backgroundImages[imageName] = (images[path] as any).default
}

const selectedBackground = computed(() => {
  const sb = board.selectedBackground || board.selectedBackground
  if (!sb) return ''
  const imageName = sb.split('/').pop()!
  return imageName
})

const backgroundImageUrl = computed(() => {
  return selectedBackground.value ? backgroundImages[selectedBackground.value] || '' : ''
})
</script>

<template>
  <RouterLink :to="`/board/${board.id}`" class="block">
    <div
      :style="{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
      class="relative flex h-full transform cursor-pointer flex-col overflow-hidden rounded-lg p-4 shadow-md transition-transform hover:scale-105 dark:bg-gray-700"
    >

      <div class="absolute inset-0 bg-black opacity-25"></div>

      <div class="relative z-10 flex h-full flex-col justify-end">
        <h4 class="mb-2 text-lg font-semibold text-white hover:text-blue-300">
          {{ board.title }}
        </h4>
      </div>
    </div>
  </RouterLink>
</template>
