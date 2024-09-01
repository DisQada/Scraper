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
- [Scraper](#scraper-1)
- [Scraper](#scraper-2)

## About

This tool uses [himalaya][himalaya] under the hood for parsing the HTML string into JSON then this packages scrolls through it to find the desired information.

Read [this](#basic-information) for more information

## License

Copyright &copy; 2024 [DisQada](https://github.com/nabil-alsaiad)

This tool is licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) License.  
See the [LICENSE](LICENSE) file for more information.

# Getting Started

## Basic information

As the package [himalaya] breaks down the JSON output into nodes, this package is following the same concept (HTML tag = JSON object/node) with the main node types being:

- [Element node](https://disqada.github.io/Scraper/types/ElementNode): Container of the main information defining the tag like the tag name, attributes and children nodes
- [Text node](https://disqada.github.io/Scraper/types/TextNode): Container of the text value in the HTML tag
- [Comment node](https://disqada.github.io/Scraper/types/CommentNode):

Click on the individual node link to read further details about the type

## Usage

First and most importantly is that we need to have our HTML string ready in a variable

If you're gonna use the same HTML string for multiple uses then it's better to parse it by yourself then pass the JSON output to the functions (so the HTML string will be parsed once only), the following example shows how to

```js
import { parse } from 'himalaya'

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
import { grabAText } from '@disqada/scraper'

const text = grabAText(nodes, {
  title: 'p'
})

// text = 'Test Page'
```

#### TextOptions

The function [`grabText`](https://disqada.github.io/Scraper/functions/grabText) can be given a [`TextOptions`](https://disqada.github.io/Scraper/types/TextOptions) object that specifies some configurations for the search process, note that it's optional

> Click on the blue highlighted `TextOptions` to read more

### An attribute value

```js
import { grabAttr } from '@disqada/scraper'

const attr = grabAttr(
  nodes,
  {
    tag: 'p'
  },
  'class'
)

// attr = 'content'
```

## CLI commands

### download

You can download an HTML file and it's parsed json file under `scrap` folder in the root path of your project outside runtime by calling the `download` command cli

#### Arguments

> Note that either `--url` or `--path` must be given

| Arg name | required | Column3                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------ |
| `--file` | true     | Name of the downloaded html and parsed json file                               |
| `--url`  | false    | Link of web page                                                               |
| `--path` | false    | Path of a local html file (the html file will be copied to the `scrap` folder) |

#### Examples

```bash
npm explore @disqada/scraper -- npm run download --url='https://example.com/sample' --file='sample'
```

```bash
npm explore @disqada/scraper -- npm run download --path='./samples/v1/index.html' --file='sample1'
```

[himalaya]: https://www.npmjs.com/package/himalaya# Scraper

# Scraper

# Scraper
