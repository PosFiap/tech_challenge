import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserController {

  public async findAll(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany()
      res.json({ user })
    } catch (err: any) {
      res.status(500).json({ err, msg: err.message })
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body
      const user = await prisma.user.create({ data: { name, email }})
      res.json({ user })
    } catch (err: any) {
      res.status(500).json({ err, msg: err.message })
    }
  }
}

export const userController = new UserController()