<script lang="ts" setup>
import AddList from './AddList.vue'

defineProps<{}>()

defineEmits<{
  (e: 'list-created', newList: any): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 transition-colors">
    <AddList @list-created="$emit('list-created', $event)" />
  </div>
</template>
