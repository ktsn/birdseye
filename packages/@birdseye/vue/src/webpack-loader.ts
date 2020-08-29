import { loader } from 'webpack'
import * as loaderUtils from 'loader-utils'
import * as yaml from 'js-yaml'

const vueBirdseyeLoader: loader.Loader = function (source, map) {
  const options = this.resourceQuery
    ? loaderUtils.parseQuery(this.resourceQuery)
    : {}

  try {
    let meta: string | object
    if (options.lang === 'yaml' || options.lang === 'yml') {
      meta = yaml.safeLoad(String(source)) ?? {}
    } else {
      meta = JSON.parse(String(source)) ?? {}
    }

    const extractPropsReq = loaderUtils.stringifyRequest(
      this,
      '@birdseye/vue/lib/extract-props'
    )

    this.callback(
      null,
      [
        `import extractProps from ${extractPropsReq}`,
        'export default function(Component) {',
        '  var props = extractProps(Component.options.props)',
        `  Component.options.__birdseye = ${JSON.stringify(meta)}`,
        '  Component.options.__birdseye.props = props',
        '}',
      ].join('\n'),
      map
    )
  } catch (err) {
    this.callback(err)
  }
}

export default vueBirdseyeLoader
