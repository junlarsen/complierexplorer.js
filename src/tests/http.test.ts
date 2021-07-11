import { CompilerExplorer } from '../http'

describe('compiler explorer http api', () => {
  const ce = new CompilerExplorer()

  describe('fetching language list', () => {
    test('fetching list with default fields', async () => {
      const res = await ce.getAllLanguages()
      const languages = await res.json()
      expect(res.ok).toEqual(true)
      expect(languages).toBeInstanceOf(Array)
      expect(languages.length).toBeGreaterThan(0)
      expect(languages[0]).toHaveProperty('name')
      expect(languages[0]).toHaveProperty('id')
      expect(languages[0]).toHaveProperty('monaco')
      expect(languages[0]).toHaveProperty('extensions')
    })
    test('fetching list with specified fields', async () => {
      const res = await ce.getAllLanguages(['example'])
      const languages = await res.json()
      expect(languages[0]).toHaveProperty('example')
      expect(languages[0]).toHaveProperty('name')
    })
  })

  describe('fetching compiler list', () => {
    test('fetching list with default fields', async () => {
      const res = await ce.getAllCompilers()
      const compilers = await res.json()
      expect(res.ok).toEqual(true)
      expect(compilers).toBeInstanceOf(Array)
      expect(compilers.length).toBeGreaterThan(0)
      expect(compilers[0]).toHaveProperty('id')
      expect(compilers[0]).toHaveProperty('name')
      expect(compilers[0]).toHaveProperty('lang')
      expect(compilers[0]).toHaveProperty('compilerType')
      expect(compilers[0]).toHaveProperty('semver')
      expect(compilers[0]).toHaveProperty('instructionSet')
    })

    test('fetching list with specified fields', async () => {
      const res = await ce.getAllCompilers(['name'])
      const compilers = await res.json()
      expect(compilers[0]).toHaveProperty('name')
      expect(compilers[0]).not.toHaveProperty('versionFlag')
    })

    test('fetching with additional fields', async () => {
      const res = await ce.getAllCompilers(['versionFlag'])
      const compilers = await res.json()
      expect(compilers[0]).toHaveProperty('versionFlag')
      expect(compilers[0]).toHaveProperty('name')
    })
  })

  describe('fetching compilers for a single language', () => {
    test('all compilers use the expected language', async () => {
      const res = await ce.getCompilers('c')
      const compilers = await res.json()
      for (const compiler of compilers) {
        expect(compiler.lang).toEqual('c')
      }
    })
  })

  describe('fetching libraries for a single language', () => {
    test('the returned data fits the schema', async () => {
      const res = await ce.getLibraries('c++')
      const libraries = await res.json()
      expect(libraries[0]).toHaveProperty('name')
      expect(libraries[0]).toHaveProperty('url')
      expect(libraries[0]).toHaveProperty('versions')
      expect(libraries[0]).toHaveProperty('id')
      expect(libraries[0].versions[0]).toHaveProperty('version')
    })
  })

  describe('sending execution requests', () => {
    test('the returned data fits the schema', async () => {
      const res = await ce.compile('clang1200', {
        allowStoreCodeDebug: false, language: 'c++', options: {
          userArguments: "-O3",
          libraries: [],
          tools: [],
        },
        source: 'int main() {}'
      })
      const schema = await res.json()
      expect(schema).toHaveProperty('code')
      expect(schema).toHaveProperty('okToCache')
      expect(schema).toHaveProperty('stdout')
      expect(schema).toHaveProperty('stderr')
      expect(schema).toHaveProperty('execTime')
      expect(schema).toHaveProperty('inputFilename')
      expect(schema).toHaveProperty('compilationOptions')
      expect(schema).toHaveProperty('tools')
      expect(schema).toHaveProperty('asmSize')
      expect(schema).toHaveProperty('asm')
      expect(schema).toHaveProperty('labelDefinitions')
      expect(schema).toHaveProperty('parsingTime')
      expect(schema).toHaveProperty('filteredCount')
      expect(schema).toHaveProperty('popularArguments')
    })
  })
})
