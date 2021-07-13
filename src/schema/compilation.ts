import { LanguageHints } from './language'

export interface CompilationRequest {
  source: string
  options: {
    userArguments: string
    executeParameters?: {
      args: string[]
      stdin: string[]
    }
    compilerOptions?: {
      skipAsm?: boolean
      executorRequest?: boolean
    }
    filters?: Record<CompileFiltersKeys, boolean | undefined>
    tools: {
      id: string
      args: string
    }[]
    libraries: {
      id: string
      version: string
    }[]
  }
  language: LanguageHints | string
  allowStoreCodeDebug: boolean
  bypassCache?: boolean
}

export interface CompilationResponse {
  code: number
  okToCache: boolean
  stdout: string[]
  stderr: string[]
  execTime: string
  inputFilename: string
  compilationOptions: string[]
  tools: unknown[] // TODO: find type
  asmSize: number
  asm: {
    text: string
    source: {
      file: string | null
      line: number
      column: number
    } | null
    labels: unknown[] // TODO: find type
  }[]
  labelDefinitions: Record<string, number>
  parsingTime: string
  filteredCount: number
  popularArguments: Record<
    string,
    {
      description: string
      timesused: number
    }
  >
}

export type CompileFiltersKeys =
  | 'binary'
  | 'commentOnly'
  | 'demangle'
  | 'directives'
  | 'execute'
  | 'intel'
  | 'labels'
  | 'libraryCode'
  | 'trim'
