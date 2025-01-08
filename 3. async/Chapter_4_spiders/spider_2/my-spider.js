import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`)
  superagent.get(url).end((err, res) => {
    if (err) {
      console.log(0, 'cb err', err);
      return cb(err)
    }

    if (res.text) {
      saveFile(filename, res.text, err => {
        if (err) {
          return cb(err)
        }
        console.log(`Downloaded and saved: ${url}`)
        cb(null, res.text)
      })
    }
  })
}

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url)
  fs.readFile(filename, 'utf-8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err)
      }

      return download(url, filename, (err, downloadedContent) => {
        if (err) {
          return cb(err)
        }

        const pageLinks = getPageLinks(url, downloadedContent)
        downloadPageLinks(pageLinks, 0, nesting - 1, cb)
      })
    }

    // File exists. Let's process pageLinks
    const pageLinks = getPageLinks(url, fileContent)
    downloadPageLinks(pageLinks, 0, nesting - 1, cb)
  })
}

function downloadPageLinks(pageLinks, index, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb)
  }

  if (index === pageLinks.length) {
    return process.nextTick(cb)
  }

  spider(pageLinks[index], nesting, (err) => {
    if (err) {
      return cb(err)
    }

    downloadPageLinks(pageLinks, index + 1, nesting, cb)
  })
}