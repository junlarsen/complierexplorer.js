import fetch, { Response } from 'node-fetch'
import { HttpClient } from './http'
export * from './index'

export class CompilerExplorer extends HttpClient<
  typeof fetch,
  Response,
  Response['headers']
> {
  constructor(host: string = 'https://godbolt.org') {
    super(host, fetch)
  }
  public override getHttpBackend(): 'node-fetch' | 'whatwg-fetch' {
    return 'node-fetch'
  }
}
