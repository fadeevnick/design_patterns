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

    if (!res.text) {
      console.log('!res.text');
      return cb()
    }

    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    // Remember Zalgo?
    return process.nextTick(cb)
  }

  const links = getPageLinks(currentUrl, body) // [1]
  if (links.length === 0) {
    return process.nextTick(cb)
  }

  let parsedLinksCount = 0;
  let hasErrors = false;

  links.forEach(link => {
    spider(link, nesting - 1, function (err) { // [3]
      parsedLinksCount++

      if (err) {
        hasErrors = true
        return cb(err)
      }

      if (parsedLinksCount === links.length && !hasErrors) {
        cb()
      }
    })
  })
}

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url)
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err)
      }

      // The file doesn't exist, so let’s download it
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err)
        }

        spiderLinks(url, requestContent, nesting, cb)
      })
    }

    // The file already exists, let’s process the links
    spiderLinks(url, fileContent, nesting, cb)
  })
}
