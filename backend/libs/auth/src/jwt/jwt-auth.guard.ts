import { type ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { AUTH_NOT_NEEDED_KEY } from '../guard.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isAuthNotNeeded = this.reflector.getAllAndOverride<boolean>(
      AUTH_NOT_NEEDED_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (isAuthNotNeeded) {
      return true
    }
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    return super.getRequest(context)
  }
}
