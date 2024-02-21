import { type ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { AUTH_NOT_NEEDED_KEY } from '../guard.decorator'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const request = this.getRequest(context)
    const isAuthNotNeeded = this.reflector.getAllAndOverride<boolean>(
      AUTH_NOT_NEEDED_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (
      isAuthNotNeeded &&
      (!request.query.groupId || request.query.groupId === '1')
    ) {
      return true
    }
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    return super.getRequest(context)
  }
}