import {
  type CanActivate,
  type ExecutionContext,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client'
import type { AuthenticatedRequest } from '../authenticated-request.interface'
import { ROLES_KEY } from './roles.decorator'
import { RolesService } from './roles.service'

@Injectable()
export class RolesGuard implements CanActivate {
  #rolesHierarchy = {}

  constructor(
    private readonly reflector: Reflector,
    private readonly service: RolesService
  ) {
    Object.keys(Role).forEach((key, index) => {
    this.#rolesHierarchy[key] = index
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest()

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]) ?? Role.User

    const user = request.user
    if (!user.role) {
      const userRole = (await this.service.getUserRole(user.id)).role
      user.role = userRole
    }
    if (this.#rolesHierarchy[user.role] >= this.#rolesHierarchy[role]) {
      return true
    }
    return false
  }
}
