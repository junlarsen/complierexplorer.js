import {
  DEFAULT_LANGUAGE_FIELDS,
  DefaultLanguageFields,
  Language,
  LanguageHints,
  LanguageResponse
} from './schema/language'
import {
  CompilerResponse,
  DEFAULT_COMPILER_FIELDS,
  DefaultCompilerFields
} from './schema/compiler'
import { LibraryResponse } from './schema/library'
import { CompilationRequest, CompilationResponse } from './schema/compilation'

const COMMON_REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export type GenericResponse<T> = {
  json(): Promise<T>
}

export interface RequestResponse<T> {
  clone(): RequestResponse<T>
  headers: T
  ok: boolean
  redirected: boolean
  status: number
  statusText: string
  type: 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect'
  url: string
}

export abstract class HttpClient<
  Fetch extends (url: string, init?: object) => Promise<Res>,
  Res extends RequestResponse<Headers>,
  Headers
> {
  protected constructor(
    protected host: string = 'https://godbolt.org',
    protected fetch: Fetch
  ) {}

  public abstract getHttpBackend(): 'node-fetch' | 'whatwg-fetch'

  /**
   * Retrieve list of programming languages the host CE supports
   *
   * @param extraFields Additional language fields to query for
   */
  async getAllLanguages<AdditionalFields extends keyof Language = never>(
    extraFields: (AdditionalFields | DefaultLanguageFields)[] = []
  ): Promise<
    GenericResponse<
      LanguageResponse<AdditionalFields & DefaultLanguageFields>[]
    > &
      Res
  > {
    const params = [...extraFields, ...DEFAULT_LANGUAGE_FIELDS].join(',')
    return this.#get(`/api/languages?fields=${params}`)
  }

  /**
   * Retrieve list of compilers the host CE supports
   *
   * @param extraFields Additional compiler fields to query for
   */
  async getAllCompilers<AdditionalFields extends string = never>(
    extraFields: (AdditionalFields | DefaultCompilerFields)[] = []
  ): Promise<
    GenericResponse<(Record<AdditionalFields, unknown> & CompilerResponse)[]> &
      Res
  > {
    const params = [...extraFields, ...DEFAULT_COMPILER_FIELDS].join(',')
    return this.#get(`/api/compilers?fields=${params}`)
  }

  /**
   * Retrieve a list of compilers the host CE supports for a given programming
   * language
   *
   * @param language Programming language by id to fetch compilers for
   * @param extraFields Additional compiler fields to query for
   */
  async getCompilers<AdditionalFields extends string = never>(
    language: LanguageHints | string,
    extraFields: (AdditionalFields | DefaultCompilerFields)[] = []
  ): Promise<
    GenericResponse<(Record<AdditionalFields, unknown> & CompilerResponse)[]> &
      Res
  > {
    const params = [...extraFields, ...DEFAULT_COMPILER_FIELDS].join(',')
    return this.#get(`/api/compilers/${language}?fields=${params}`)
  }

  /**
   * Retrieve a list of libraries the host CE supports for a given programming
   * language
   *
   * @param language Programming language by id to fetch compilers for
   */
  async getLibraries(
    language: LanguageHints | string
  ): Promise<GenericResponse<LibraryResponse[] & Res>> {
    return this.#get(`/api/libraries/${language}`)
  }

  /**
   * Compile a piece of code using the specified compilation options
   * @param compiler Compiler id to invoke
   * @param compilation Compilation options to pass to compiler
   */
  async compile<T extends object = {}>(
    compiler: string,
    compilation: (CompilationRequest & T) | T
  ): Promise<GenericResponse<CompilationResponse & Res>> {
    return this.#post(`/api/compiler/${compiler}/compile`, compilation)
  }

  async #post<T, S extends object>(
    url: string,
    body: S
  ): Promise<GenericResponse<T> & Res> {
    return (await this.fetch(`${this.host}${url}`, {
      method: 'POST',
      headers: COMMON_REQUEST_HEADERS,
      body: JSON.stringify(body ?? {})
    })) as Res & GenericResponse<T>
  }

  async #get<T>(url: string): Promise<GenericResponse<T> & Res> {
    return (await this.fetch(`${this.host}${url}`, {
      headers: COMMON_REQUEST_HEADERS
    })) as Res & GenericResponse<T>
  }
}
