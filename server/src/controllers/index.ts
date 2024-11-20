import { router } from '../trpc'
import board from './board'
import user from './user'
import list from './list'
import card from './card'
import templates from './templates'


export const appRouter = router({
  board,
  list,
  card,
  user,
  templates,
})

export type AppRouter = typeof appRouter
