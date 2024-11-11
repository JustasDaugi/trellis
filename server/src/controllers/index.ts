import { router } from '../trpc'
import board from './board'
import user from './user'
import list from './list'
import card from './card'


export const appRouter = router({
  board,
  list,
  card,
  user, 
})

export type AppRouter = typeof appRouter
