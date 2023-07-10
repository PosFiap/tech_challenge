export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface HttpRequest {
  host: string
  method: HttpMethod
  path?: string
  body?: any
  headers?: any
}

export interface HttpResponse<T = any> {
  statusCode: HttpStatusCode
  body?: T
}

export interface IHttp {
  request<T>(config: HttpRequest): Promise<HttpResponse<T>>
}
