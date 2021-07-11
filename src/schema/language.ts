export interface Language {
  /** A textual name for the programming language (e.g. Assembly) */
  name: string
  /** CompilerExplorer internal id for the programming language (e.g. c) */
  id: string
  /** Name of the monaco-editor language this programming language uses */
  monaco: string
  /** List of file extensions the programming language often uses (e.g. .cpp) */
  extensions: string[]
  /** Any alias names the programming language has  (e.g. cpp for C++) */
  alias: string[]
  /** A piece of sample code written in the programming language */
  example: string
  /** The id of the default compiler the language uses for the host CE */
  defaultCompiler: string
}

/**
 * Default JSON fields the CompilerExplorer API returns when fields are not
 * specified in the API request
 */
export const DEFAULT_LANGUAGE_FIELDS = [
  'id',
  'name',
  'extensions',
  'monaco'
] as const

export type DefaultLanguageFields = typeof DEFAULT_LANGUAGE_FIELDS[number]

/**
 * Entry for a programming language the host CompilerExplorer server has
 * compilers for
 *
 * @param K - API fields to return, defaults to [id, name, extensions, monaco]
 */
export type LanguageResponse<K extends keyof Language = DefaultLanguageFields> =
  Pick<Language, K>

/**
 *  List of languages which are supported on the official CompilerExplorer
 *  instance
 */
export type LanguageHints =
  | 'ada'
  | 'analysis'
  | 'assembly'
  | 'c++'
  | 'c'
  | 'clean'
  | 'cppx'
  | 'cppx_blue'
  | 'ccpx_gold'
  | 'crystal'
  | 'cuda'
  | 'd'
  | 'fortran'
  | 'go'
  | 'haskell'
  | 'ispc'
  | 'java'
  | 'kotlin'
  | 'llvm'
  | 'nim'
  | 'ocaml'
  | 'openclc'
  | 'pascal'
  | 'python'
  | 'rust'
  | 'scala'
  | 'swift'
  | 'zig'
