import * as path from 'path'
import * as rimraf from 'rimraf'
import * as fs from 'fs'
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

  const outDir = 'birdseye/snapshots'

  let killServer: () => void
  beforeAll(async () => {
    rimraf.sync(outDir)
    killServer = runCatalogServer()
    await wait(3000)
  })

  afterAll(() => {
    killServer()
  })

  it('outputs images to the default location', async () => {
    await snapshot({
      url
    })

    const files = await fs.promises.readdir(outDir)
    files.sort().forEach(file => {
      // Use sync version to make sure the order is not changed
      const image = fs.readFileSync(path.join(outDir, file))
      expect(image).toMatchImageSnapshot()
    })
  })
})
