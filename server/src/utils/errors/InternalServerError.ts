import { TRPCError } from '@trpc/server'

export default class NotFoundError extends TRPCError {
  constructor(message: string) {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      message,
    })
  }
}
