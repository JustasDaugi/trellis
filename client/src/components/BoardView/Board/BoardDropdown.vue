<script lang="ts" setup>
import DropdownMenu from '@/components/DropdownMenu.vue'
import UpdateBoard from './UpdateBoard.vue'
import DeleteBoard from './DeleteBoard.vue'
import type { BoardPublic } from '@server/shared/types'
import { ref } from 'vue'

const props = defineProps<{
  board: BoardPublic
}>()

const emit = defineEmits<{
  (e: 'change-name', newName: string): void
  (e: 'delete-board'): void
}>()

const deleteBoardRef = ref<InstanceType<typeof DeleteBoard> | null>(null)
const dropdownMenuRef = ref<InstanceType<typeof DropdownMenu> | null>(null)

const onDelete = () => {
  if (deleteBoardRef.value) {
    deleteBoardRef.value.open()
  }
}

const changeName = (newName: string) => {
  emit('change-name', newName)
  dropdownMenuRef.value?.closeDropdown()
}
</script>

<template>
  <DropdownMenu ref="dropdownMenuRef" :board="props.board">
    <template #content>
      <UpdateBoard :board="props.board" @change-name="changeName" />
      <button
        @click="onDelete"
        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
      >
        Delete board
      </button>
      <DeleteBoard ref="deleteBoardRef" :board="props.board" @delete-board="emit('delete-board')" />
    </template>
  </DropdownMenu>
</template>
