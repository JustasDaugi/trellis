import { computed, type Ref } from 'vue'
import type { Board } from '@server/shared/types'

const images = import.meta.glob('@/assets/*.jpg', { eager: true })

const backgroundImages: Record<string, string> = {}
for (const path in images) {
  const imageName = path.split('/').pop()!
  backgroundImages[imageName] = (images[path] as any).default
}
export function getBackgroundImageUrl(board: Board): string {
  if (!board.selectedBackground) return ''
  const imageName = board.selectedBackground.split('/').pop()!
  return backgroundImages[imageName] || ''
}

export function useBackgroundImage(board: Ref<Board | null>) {
  const backgroundImageUrl = computed(() => {
    if (!board.value || !board.value.selectedBackground) return ''
    const imageName = board.value.selectedBackground.split('/').pop()!
    return backgroundImages[imageName] || ''
  })

  return { backgroundImageUrl }
}
