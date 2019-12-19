import * as path from 'path'
import { spawn } from 'child_process'
import { snapshot } from '../src'

const url = 'http://localhost:50000'

describe('Snapshot', () => {
  function runCatalogServer(): () => void {
    const cp = spawn(
      'yarn vue-cli-service serve --port 50000 test/fixture/main.ts',
      {
        cwd: path.resolve(__dirname, '../'),
        shell: true,
        stdio: 'ignore'
      }
    )

    return () => {
      cp.kill()
    }
  }

  function wait(n: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, n)
    })
  }

  let killServer: () => void
  beforeAll(async () => {
    killServer = runCatalogServer()
    await wait(3000)
  })

  afterAll(() => {
    killServer()
  })

  it('test', async () => {
    await snapshot({
      url
    })
  })
})
