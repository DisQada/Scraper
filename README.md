# Scraper

## Badges

[![github](https://img.shields.io/badge/DisQada/Scraper-000000?logo=github&logoColor=white)](https://www.github.com/DisQada/Scraper)
[![npm](https://img.shields.io/badge/@disqada/scraper-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@disqada/scraper)

![version](https://img.shields.io/npm/v/@disqada/scraper.svg?label=latest&logo=npm)
![monthly downloads](https://img.shields.io/npm/dm/@disqada/scraper.svg?logo=npm)

[![Test](https://github.com/DisQada/Scraper/actions/workflows/test.yml/badge.svg)](https://github.com/DisQada/Scraper/actions/workflows/test.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [Scraper](#scraper)
  - [Badges](#badges)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [License](#license)
- [Getting Started](#getting-started)
  - [Basic information](#basic-information)
  - [Usage](#usage)
    - [A full node](#a-full-node)
    - [A text value](#a-text-value)
      - [TextOptions](#textoptions)
    - [An attribute value](#an-attribute-value)
  - [CLI commands](#cli-commands)
    - [download](#download)
      - [Arguments](#arguments)
      - [Examples](#examples)

## About

This tool uses its own parsing of the HTML into JSON, then this package scrolls through it to find the desired information.

Read [this](#basic-information) for more information. Or visit [this](https://disqada.github.io/Scraper) website for the API types

## License

Copyright &copy; 2024 [DisQada](https://links.disqada.org)

This tool is licensed under the [Apache 2.0](https://apache.org/licenses/LICENSE-2.0) License.  
See the [LICENSE](LICENSE) file for more information.

# Getting Started

## Basic information

The package breaks down the HTML into JSON nodes, following the concept that an HTML tag is represented as a JSON object/node.

Each node represents an HTML tag with it's tag name, attributes and children nodes. The children nodes may contain text as string values

> Note that the parser completely ignores HTML comments `(<!--example-->)`

## Usage

First and most importantly, we need to have our HTML string ready in a variable.

If you're going to use the same HTML string for multiple uses, it's better to parse it yourself and then pass the JSON output to the functions (so the HTML string will be parsed only once). The following example shows how to do this:

```js
import { parse } from '@disqada/scraper'

// Use another package to fetch the HTML from the web
const html = `
  <html>
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <h1 id="title">Hello, world!</h1>
      <p class="content">This is a test paragraph.</p>
    </body>
  </html>
`
const nodes = parse(html)

// Rest of the code ...
```

### A full node

```js
import { findNode } from '@disqada/scraper'

const node = findNode(nodes, {
  tag: 'h1',
  attr: {
    key: 'id',
    value: 'title'
  }
})

// node = {
//   type: 'element',
//   tagName: 'h1'
//   attributes: [{key: 'id', value: 'title' }],
//   children: []
// }
```

### A text value

```js
import { grabText } from '@disqada/scraper'

const text = grabText(nodes, {
  tag: 'p'
})

// text = 'This is a test paragraph.'
```

#### TextOptions

The function [`grabText`](https://disqada.github.io/Scraper/functions/grabText) can be given a [`TextOptions`](https://disqada.github.io/Scraper/types/TextOptions) object that specifies some configurations for the search process. Note that it's optional.

> Click on the blue highlighted `TextOptions` to read more.

### An attribute value

```js
import { grabAttr } from '@disqada/scraper'

const attr = grabAttr(nodes, { tag: 'p' }, 'class')

// attr = 'content'
```

## CLI commands

### download

You can download an HTML file and its parsed JSON file under the `scrap` folder in the root path of your project outside runtime by calling the `download` command CLI.

#### Arguments

> Note that either `--url` or `--path` must be given

| Arg name | required | Description                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------ |
| `--file` | true     | Name of the downloaded HTML and parsed JSON file                               |
| `--url`  | false    | Link of the web page                                                           |
| `--path` | false    | Path of a local HTML file (the HTML file will be copied to the `scrap` folder) |

#### Examples

```bash
scraper --url='https://example.com/sample' --file='sample'
```

```bash
scraper --path='./samples/v1/index.html' --file='sample1'
```
