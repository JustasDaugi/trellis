<script lang="ts" setup>
import DropdownMenu from '@/components/DropdownMenu.vue'
import type { ListPublic } from '@server/shared/types'
import UpdateList from './UpdateList.vue'
import DeleteList from './DeleteList.vue'
import { ref } from 'vue'

const props = defineProps<{
  list: ListPublic
}>()

const emit = defineEmits<{
  (e: 'change-name', newName: string): void
  (e: 'delete-list'): void
}>()

const deleteListRef = ref<InstanceType<typeof DeleteList> | null>(null)
const dropdownMenuRef = ref<InstanceType<typeof DropdownMenu> | null>(null)

const onDelete = () => {
  if (deleteListRef.value) {
    deleteListRef.value.open()
  }
}

const changeName = (newName: string) => {
  emit('change-name', newName)
  dropdownMenuRef.value?.closeDropdown()
}
</script>

<template>
  <DropdownMenu ref="dropdownMenuRef">
    <template #content>
      <UpdateList :list="props.list" @change-name="changeName" />
      <button
        @click="onDelete"
        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
      >
        Delete list
      </button>
      <DeleteList ref="deleteListRef" :list="props.list" @delete-list="emit('delete-list')" />
    </template>
  </DropdownMenu>
</template>
