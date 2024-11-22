import { router } from '@server/trpc'
import create from './create'
import findAll from './findAll'
import get from './get'
import deleteById from './deleteById'
import update from './update'

export default router({
  create,
  findAll,
  get,
  deleteById,
  update
})
