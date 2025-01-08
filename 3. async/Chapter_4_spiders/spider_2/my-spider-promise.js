import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import { promisify } from 'util'

const mkdirpPromise = promisify(mkdirp)

function saveFile(filename, contents) {
  return mkdirpPromise(path.dirname(filename))
    .then(() => {
      return fs.promises.writeFile(filename, contents)
    })
}

function download(url, filename) {
  console.log(`Downloading ${url}`)
  return superagent.get(url)
    .then((res) => {
      if (!res.text) {
        return console.log('res.text is null');
      }

      return saveFile(filename, res.text)
        .then(() => {
          console.log(`Downloaded and saved: ${url}`)
          return res.text
        })
    })
}

function spiderLinks(currentUrl, body, nesting) {
  if (nesting === 0) {
    // Remember Zalgo?
    return Promise.resolve()
  }

  const links = getPageLinks(currentUrl, body) // [1]
  if (links.length === 0) {
    return Promise.resolve()
  }

  let p = spider(links[0], nesting - 1)
  for (let i = 1; i < links.length; i++) {
    p = p.then(() => spider(links[i], nesting - 1))
  }

  return p;
}

export function spider(url, nesting) {
  const filename = urlToFilename(url)
  return fs.promises.readFile(filename, 'utf8')
    .then((fileContent) => {
      // The file already exists, let’s process the links
      return spiderLinks(url, fileContent, nesting)
    })
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err
      }

      // The file doesn't exist, so let’s download it
      return download(url, filename)
        .then((requestContent) => {
          return spiderLinks(url, requestContent, nesting)
        })
    })
}
