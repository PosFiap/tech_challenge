import { Router } from 'express'

export interface IHttpRoute {
  getRouter(): Router
}
