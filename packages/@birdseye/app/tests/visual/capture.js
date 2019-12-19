const path = require('path')
const { spawn } = require('child_process')
const { snapshot } = require('../../../snapshot') // Avoid circular dependencies
const rimraf = require('rimraf')

function wait(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

const snapshotDir = path.resolve(__dirname, '../../snapshots')

;(async () => {
  rimraf.sync(snapshotDir)

  const cp = spawn('yarn serve', {
    cwd: path.resolve(__dirname, '../../'),
    shell: true,
    stdio: 'ignore'
  })

  await wait(3000)

  await snapshot({
    url: 'http://localhost:8080',
    snapshotDir
  })

  cp.kill()
})()
