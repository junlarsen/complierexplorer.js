<br />
<p align="center">
  <h3 align="center">CompilerExplorer.js</h3>

  <p align="center">
    Module for inspecting code using CompilerExplorer
    <br />
    <a href="https://github.com/supergrecko/compilerexplorer.js/issues">Report Bug</a>
    |
    <a href="https://github.com/supergrecko/compilerexplorer.js/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Getting Started

CompilerExplorer.js is a node module (with browser support) for querying CompilerExplorer's REST API

- [API Documentation][1]

### Prerequisites

There are two versions of this package available; Node.js and browser versions.

**Node.js**
- Node.js (any recentversion should run, tested with 14.x)
- Node Package Manager (or alternatively Yarn)

**Browser**
There are no prerequisites for using this library from the browser.

### Installation

**Browser**
A minimized JavaScript file is available under the Releases tab on GitHub. You may
add this to your project. This file will add a new global.

**Node.js**
The project ships as an NPM module, installable through Yarn or NPM. To add the
package to your project, install it through your package manager of choice.

```sh
$ yarn install compilerexplorer.js
# Or ...
$ npm install compilerexplorer.js
```

## Usage

**Node.js**

```ts
import { CompilerExplorer } from 'compilerexplorer.js'

const ce = new CompilerExplorer("https://godbolt.org")
```

**Browser**

```ts
const ce = new window.CompilerExplorer("https://godbolt.org")
```

The library is used the same way for both browser and Node.js. The documentation
will assume a variable `ce` exists which is instantiated as shown above.

CompilerExplorer.js ships 5 primary APIs:

- `ce.getAllLanguages`: Fetch a list of programming languages the Compiler Explorer host supports
- `ce.getAllCompilers`: Fetch a list of compilers the Compiler Explorer host supports
- `ce.getCompilers`: Fetch a list of compilers for a given programming language
- `ce.getLibraries`: Fetch a list of libraries and their versions for a given programming language
- `ce.compile`: Compile and inspect a piece of code using the host CompilerExplorer

## License

Distributed under the MIT License. See `LICENSE` for more information.

[1]: https://github.com/compiler-explorer/compiler-explorer/blob/main/docs/API.md