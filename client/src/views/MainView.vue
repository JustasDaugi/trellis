<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import CreateBoard from '../components/CreateBoard.vue'
import SearchBoards from '../components/SearchBoards.vue'
import { FwbButton } from 'flowbite-vue'
import { isLoggedIn, logout } from '@/stores/user'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const router = useRouter()
function logoutUser() {
  logout()
  router.push({ name: 'Login' })
}

const loggedIn = computed(() => isLoggedIn.value)
</script>

<template>
  <div class="relative min-h-screen" @click="closeSidebar">
    <header class="fixed left-0 top-0 z-50 w-full bg-gray-800 text-gray-300 shadow-md">
      <div class="container mx-auto flex items-center justify-between px-4 py-3" @click.stop>
        <FwbButton
          size="sm"
          variant="light"
          @click.stop="toggleSidebar"
          aria-label="Toggle sidebar"
          class="bg-gray-700 p-2 hover:bg-gray-600 focus:ring-gray-500"
        >
          <span class="mb-1 block h-0.5 w-6 bg-gray-400"></span>
          <span class="mb-1 block h-0.5 w-6 bg-gray-400"></span>
          <span class="block h-0.5 w-6 bg-gray-400"></span>
        </FwbButton>
        <span class="text-lg font-medium">Boards</span>
        <SearchBoards />
      </div>
    </header>
    <Sidebar :isSidebarOpen="isSidebarOpen" :loggedIn="loggedIn" @logout="logoutUser" />
    <CreateBoard />
  </div>
</template>
