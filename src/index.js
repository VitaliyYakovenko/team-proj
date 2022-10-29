const { readFileSync } = require('fs')

const posthtml = require('posthtml')
const include = require('posthtml-include')

const html = readFileSync('index.html')

posthtml([ include({ encoding: 'utf8' }) ])
    .process(html)
    .then((result) => console.log(result.html))