import { HttpClient } from './http'

declare global {
  interface Window {
    CompilerExplorer: new (url?: string) => CompilerExplorer
  }
}

export class CompilerExplorer extends HttpClient<
  typeof fetch,
  Response,
  Response['headers']
> {
  constructor(host: string = 'https://godbolt.org') {
    super(host, window.fetch.bind(window))
  }
  public override getHttpBackend(): 'node-fetch' | 'whatwg-fetch' {
    return 'whatwg-fetch'
  }
}

window.CompilerExplorer = CompilerExplorer
