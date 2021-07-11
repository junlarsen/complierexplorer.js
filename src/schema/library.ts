export interface LibraryEntry {
  /** A textual name for the library */
  name: string
  /** Link to the library's homepage */
  url: string
  /** CompilerExplorer internal name for library */
  id: string
  /** List of versions available for this library */
  versions: Library[]
}

export interface Library {
  /** Version tag */
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
  /** CompilerExplorer internal id of this library version */
  id: string
}

export type LibraryResponse = LibraryEntry
