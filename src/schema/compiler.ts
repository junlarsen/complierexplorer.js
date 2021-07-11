export interface CompilerBase {
  /** CompilerExplorer internal id for the compiler */
  id: string
  /** Path to the compiler's executable */
  exe: string
  /** A textual name for the compiler (e.g. x86-64 gcc 11.1) */
  name: string
  /** Any alias names for the compiler */
  alias: string[]
  /** Default command line options passed to the compiler */
  options: string
  /** Version tag of compiler */
  version: string
  /**
   * CompilerExplorer internal id of the programming language this compiler may
   * compile code for (e.g. openclc)
   */
  lang: string
  /**
   * CompilerExplorer internal class used to process compilations using this
   * compiler
   */
  compilerType: string
  /** Is the compiler semantically versioned? */
  isSemVer: boolean
  /** Semantical versioning string, "" if isSemVer is false */
  semver: string
  /** Assembly/bytecode language instruction set (e.g. amd64) */
  instructionSet: string
  /** Does the compiler support intel x86 asm syntax? */
  supportsIntel: boolean
  /** Does the compiler support opt tool output? */
  supportsOptOutput: boolean
  /** Does the compiler support abstract-syntax-tree viewer? */
  supportsAstView: boolean
  /** Does the compiler support control-flow-graph viewer? */
  supportsCfg: boolean
  /** Does the compiler support de-mangling of mangled names? */
  supportsDemangle: boolean
  /** Does the compiler support compiling to binary? */
  supportsBinary: boolean
  /** Does the compiler support code execution? */
  supportsExecute: boolean
  /** Does the compiler support library code filtering? */
  supportsLibraryCodeFilter: boolean
  /** Does the compiler support IR view? This property is only present if true */
  supportsIrView?: boolean
  /** Does the compiler support gcc dump? This property is only present if true */
  supportsGccDump?: boolean
  /** List of output filters which the compiler does not support */
  disabledFilters: string[]
  /** Dictionary of tools the compiler supports */
  tools?: Record<string, ToolEntry>
  /** Dictionary of libraries the compiler supports */
  libs?: Record<string, LibraryEntry>
}

export interface LibraryEntry {
  /** A textual name for the library */
  name: string
  /** Link to the library's homepage */
  url: string
  /** A short description about the library */
  description: string
  /** Library entries to statically link when building */
  staticliblink: string[]
  /** Library entries to link when building */
  liblink: string[]
  /** Example code using the library */
  examples: string[]
  /** Additional options */
  options: string[]
  /** A version matrix for this library */
  versions: Record<string, Library>
}

export interface Library {
  /** A textual name for the library */
  name: string[]
  /** Version tag for this version of the libray */
  version: string
  /** Library entries to statically link when building */
  staticliblink: string[]
  /** Library entries to link when building */
  liblink: string[]
  /** Alias names for this version */
  alias: string[]
  /** Dependencies the library requires */
  dependencies: string[]
  /** Paths on disk to the library's binaries */
  path: string[]
  /** Linker paths to add when linking */
  libpath: string[]
  /** Additional options */
  options: string[]
}

export interface ToolEntry {
  /** A reference to the tool schema */
  tool: Tool
  /** Environment variables to add when running the tool */
  env: Record<string, string>
  /** Add Tool.Options to arguments when invoking the tool */
  addOptionsToToolArgs: boolean
}

export interface Tool {
  /** CompilerExplorer internal id for tool */
  id: string
  /** Textual name for the tool */
  name: string
  /** What kind of tool is this? (e.g. format) */
  type: string
  /** Path to tool executable */
  exe: string
  exclude: string[]
  /** Command line options to pass to tool */
  options: string[]
  stdinHint: string
  /** CompilerExplorer language this tool is used for */
  compilerLanguage: string
}

/**
 * Default JSON fields the CompilerExplorer API returns when fields are not
 * specified in the API request
 */
export const DEFAULT_COMPILER_FIELDS = [
  'id',
  'name',
  'lang',
  'compilerType',
  'semver',
  'instructionSet'
] as const

export type DefaultCompilerFields = typeof DEFAULT_COMPILER_FIELDS[number]

export type CompilerResponse<
  K extends keyof CompilerBase = DefaultCompilerFields
> = Pick<CompilerBase, K>
