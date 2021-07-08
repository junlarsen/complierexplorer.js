import {
  LanguageResponse,
  DefaultLanguageFields,
  DEFAULT_LANGUAGE_FIELDS,
  Language
} from './schema/language'
import fetch, { Response } from 'node-fetch'
import {
  CompilerResponse,
  DEFAULT_COMPILER_FIELDS,
  DefaultCompilerFields
} from './schema/compiler'

const COMMON_REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

/** Strongly typed JSON body variant of Fetch Response */
export class GenericResponse<T> extends Response {
  constructor(parent: Response) {
    super(parent.body, parent)
  }

  /** De-serialize response body into JSON as type T */
  async json(): Promise<T> {
    const object = await super.json()

    return object as T
  }
}

export class CompilerExplorer {
  public constructor(protected host: string = 'https://godbolt.org') {}

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
    >
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
    GenericResponse<(Record<AdditionalFields, unknown> & CompilerResponse)[]>
  > {
    const params = [...extraFields, ...DEFAULT_COMPILER_FIELDS].join(',')
    return this.#get(`/api/compilers?fields=${params}`)
  }

  async #get<T>(url: string): Promise<GenericResponse<T>> {
    const res = await fetch(`${this.host}${url}`, {
      headers: COMMON_REQUEST_HEADERS
    })
    return new GenericResponse<T>(res)
  }
}
