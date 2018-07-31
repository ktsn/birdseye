import { loader } from 'webpack'

const vueBirdseyeLoader: loader.Loader = function(source, map) {
  try {
    this.callback(
      null,
      [
        'export default function(Comonent) {',
        `  Component.options.__birdseye = ${JSON.stringify(
          JSON.parse(String(source))
        )}`,
        '}'
      ].join('\n'),
      map
    )
  } catch (err) {
    this.callback(err)
  }
}

export default vueBirdseyeLoader
