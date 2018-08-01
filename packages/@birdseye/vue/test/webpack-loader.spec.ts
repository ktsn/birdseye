import loader from '../src/webpack-loader'

function test(
  content: string,
  lang: string | null,
  cb: (err: Error, result: string) => void
): void {
  loader.call(
    {
      callback: cb,
      resourceQuery: lang ? '?lang=' + lang : ''
    },
    content
  )
}

describe('webpack loader', () => {
  it('injects birdseye content', done => {
    test(
      `{
        "name": "Test"
      }`,
      null,
      (_err, result) => {
        expect(result).toMatchInlineSnapshot(`
"export default function(Component) {
  Component.options.__birdseye = {\\"name\\":\\"Test\\"}
}"
`)
        done()
      }
    )
  })

  it('emit parse error', () => {
    test(`{ "name": "Test", }`, null, err => {
      expect(err.name).toBe('SyntaxError')
    })
  })

  it('loads yaml data', () => {
    test(`name: Test`, 'yaml', (_err, result) => {
      expect(result).toMatchInlineSnapshot(`
"export default function(Component) {
  Component.options.__birdseye = {\\"name\\":\\"Test\\"}
}"
`)
    })
  })
})
