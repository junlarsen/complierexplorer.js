import { CompilerExplorer } from '../src/node'

async function main() {
  const ce = new CompilerExplorer()
  const res = await ce.getAllCompilers()
  const compilers = await res.json()

  for (const compiler of compilers) {
    console.log(`Compiler ${compiler.name} for ${compiler.lang}`)
  }
}

main()