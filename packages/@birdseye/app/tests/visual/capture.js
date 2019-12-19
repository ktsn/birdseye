const path = require('path')
const { spawn } = require('child_process')
const { snapshot } = require('@birdseye/snapshot')

function wait(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

;(async () => {
  const cp = spawn('yarn serve', {
    cwd: path.resolve(__dirname, '../../'),
    shell: true,
    stdio: 'pipe'
  })

  await wait(3000)

  await snapshot({
    url: 'http://localhost:8080',
    snapshotDir: path.resolve(__dirname, '../../snapshots')
  })

  cp.kill()
})()
