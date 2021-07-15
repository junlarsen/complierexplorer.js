import { CompilerExplorer } from '../src/node'

async function main() {
  const ce = new CompilerExplorer()
  const res = await ce.compile('clang1200', {
    language: 'c++',
    source: `
    #include <iostream>
    int main() {
      std::cout << "Hello from CompilerExplorer.js";
    }
    `,
    options: {
      filters: {
        execute: true,
      },
      compilerOptions: {
        executorRequest: true
      },
      executeParameters: []
    }
  })
  const compilation = await res.json()
  console.log(`Compilation returned code ${compilation.code}`)
  console.log(`Execution returned: ${compilation.stdout}`)
}

main()