#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFile } from 'fs'
import { resolve, join } from 'path'
import { get as httpGet } from 'http'
import { get as httpsGet } from 'https'
import { parse } from '../src/func/parse.js'

const config = {
  /** @type {string | null} */
  url: null,
  /** @type {string | null} */
  path: null,
  /** @type {string | null} */
  file: null,
  /** @type {string} */
  encoding: 'utf8'
}

process.argv.slice(2).forEach((arg) => {
  let [key, value] = arg.split('=')
  key = key.replace('--', '')
  // eslint-disable-next-line no-prototype-builtins
  if (config.hasOwnProperty(key)) {
    config[key] = value
  }
})

if (!config.url && !config.path) {
  console.error('Missing --url and --path argument, one of them is required')
  process.exit(1)
}

if (!config.file) {
  console.error('Missing --file argument')
  process.exit(1)
}

if (config.url) {
  const get = config.url.startsWith('https:') ? httpsGet : httpGet
  get(config.url, (response) => {
    let html = ''
    response.on('data', (chunk) => (html += chunk))
    response.on('end', () => writeFile(html, true))
  }).on('error', (error) => {
    console.error('Error loading HTML from URL:', error)
  })
} else if (config.path) {
  const filePath = resolve(config.path)
  // @ts-expect-error
  readFile(filePath, config.encoding, (error, html) => {
    if (error) {
      console.error('Error reading HTML file:', error)
      return
    }

    writeFile(html)
  })
}

/**
 *
 * @param {string} html .
 * @param {boolean} [withHtml] @default false
 * @returns {void}
 */
function writeFile(html, withHtml = false) {
  if (!config.file) {
    console.error('Missing --file argument')
    process.exit(1)
  }

  const folderPath = join(process.cwd(), 'scrap')
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath)
  }

  const json = JSON.stringify(parse(html), null, 2)
  const filePath = join(folderPath, config.file)

  // @ts-expect-error
  writeFileSync(filePath + '.json', json, config.encoding)
  if (withHtml) {
    // @ts-expect-error
    writeFileSync(filePath + '.html', html, config.encoding)
  }
}
