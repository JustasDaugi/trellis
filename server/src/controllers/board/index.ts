import { router } from '@server/trpc'
import create from './create'
import findAll from './findAll'
import deleteById from './deleteById'
import update from './update'

export default router({
  create,
  findAll,
  deleteById,
  update
})
