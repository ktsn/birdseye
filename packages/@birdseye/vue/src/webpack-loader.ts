import { loader } from 'webpack'
import * as loaderUtils from 'loader-utils'
import * as yaml from 'js-yaml'

const vueBirdseyeLoader: loader.Loader = function(source, map) {
  const options = this.resourceQuery
    ? loaderUtils.parseQuery(this.resourceQuery)
    : {}

  try {
    let meta: string
    if (options.lang === 'yaml' || options.lang === 'yml') {
      meta = yaml.safeLoad(String(source))
    } else {
      meta = JSON.parse(String(source))
    }

    this.callback(
      null,
      [
        'export default function(Component) {',
        `  Component.options.__birdseye = ${JSON.stringify(meta)}`,
        '}'
      ].join('\n'),
      map
    )
  } catch (err) {
    this.callback(err)
  }
}

export default vueBirdseyeLoader
