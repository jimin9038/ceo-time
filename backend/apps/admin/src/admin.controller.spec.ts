import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { AdminController } from '@admin/admin.controller'
import { AdminService } from '@admin/admin.service'

describe('AdminController', () => {
  let adminController: AdminController

  beforeEach(async () => {
    const admin: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService]
    }).compile()

    adminController = admin.get<AdminController>(AdminController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(adminController.getHello()).toBe('Hello World!')
    })
  })
})
