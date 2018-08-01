import loader from '../src/webpack-loader'

function test(content: string, cb: (err: Error, result: string) => void): void {
  loader.call(
    {
      callback: cb
    },
    content
  )
}

describe('webpack loader', () => {
  it('injects birdseye content', done => {
    test(
      `
    {
      "name": "Test"
    }
    `,
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
    test(`{ "name": "Test", }`, err => {
      expect(err.name).toBe('SyntaxError')
    })
  })
})
