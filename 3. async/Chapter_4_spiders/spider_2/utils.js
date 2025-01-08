import path from 'path'
import { URL } from 'url'
import slug from 'slug'
import * as cheerio from 'cheerio'

export function urlToFilename(url) {
  const parsedUrl = new URL(url)

  const urlPath = parsedUrl.pathname
    .split('/')
    .filter(component => component !== '')
    .map(component => slug(component, { remove: null }))
    .join('/')

  // console.log(1, `urlPath`, urlPath);
  // console.log(2, `parsedUrl`, parsedUrl.hostname);

  let filename = path.join(parsedUrl.hostname, urlPath)
  // console.log(3, `filename`, filename);

  if (!path.extname(filename).match(/htm/)) {
    filename += '.html'
  }

  return filename
}

export function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl)
  const currentParsedUrl = new URL(currentUrl)
  // console.log(2, 'parsedLink.hostname', parsedLink.hostname);
  // console.log(3, 'currentParsedUrl.hostname', currentParsedUrl.hostname);
  // console.log(4, 'parsedLink.pathname', parsedLink.pathname);
  if (parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname) {
    return null
  }
  return parsedLink.toString()
};

export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      // console.log(0, 'element', element);
      const linkUrl = getLinkUrl(currentUrl, element)
      // console.log(1, 'linkUrl', linkUrl);
      return linkUrl;
    })
    .filter(Boolean)
};
