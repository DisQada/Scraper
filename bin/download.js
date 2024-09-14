#!/usr/bin/env node

import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { get as httpsGet } from 'https'
import { get as httpGet } from 'http'
import { join, resolve } from 'path'
import { parse } from '../src/func/parse.js'

/** @type {Config} */
const config = {
  url: null,
  path: null,
  file: null,
  encoding: 'utf8'
}

process.argv.slice(2).forEach((arg) => {
  let [key, value] = arg.split('=')
  key = key.replace('--', '')
  if (key in config) config[key] = value
})

const { url, path, file, encoding } = config

if (!url && !path) throw new Error('Missing --url and --path argument, one of them is required')
if (!file) throw new Error('Missing --file argument')

if (url) {
  const get = url.startsWith('https:') ? httpsGet : httpGet
  get(url, (res) => {
    let html = ''
    res.on('data', (chunk) => (html += chunk))
    res.on('end', () => writeIt(html, true))
  }).on('error', (err) => {
    throw err
  })
} else if (path) {
  const filePath = resolve(path)
  const html = await readFile(filePath, encoding)
  writeIt(html)
}

/**
 * @param {string} html .
 * @param {boolean} [withHtml] Default is false.
 * @returns {Promise<void>}
 */
async function writeIt(html, withHtml = false) {
  if (!file) throw new Error('Missing --file argument')

  const folderPath = join(process.cwd(), 'scrap')
  if (!existsSync(folderPath)) mkdirSync(folderPath)

  const json = JSON.stringify(parse(html), null, 2)
  const filePath = join(folderPath, file)

  const promises = [writeFile(filePath + '.json', json, encoding)]
  if (withHtml) promises.push(writeFile(filePath + '.html', html, encoding))
  await Promise.all(promises)
}

/**
 * @typedef {object} Config
 * @property {string | null} url
 * @property {string | null} path
 * @property {string | null} file
 * @property {BufferEncoding} encoding
 */
