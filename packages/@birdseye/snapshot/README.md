# @birdseye/snapshot

Taking snapshots for Birdseye catalog.

## Install

```sh
$ npm install --save-dev @birdseye/snapshot
```

## Usage

Write `birdseye/capture.js` like below:

```js
const path = require('path')
const { spawn } = require('child_process')
const { snapshot } = require('@birdseye/snapshot')

function wait(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

;(async () => {
  // Run catalog server
  const cp = spawn('npm run serve -- birdseye/preview.js', {
    cwd: path.resolve(__dirname, '../'),
    shell: true,
    stdio: 'ignore'
  })

  // Wait until server is ready
  await wait(3000)

  // Get snapshots for all component catalogs
  await snapshot({
    url: 'http://localhost:8080'
  })

  // Kill the server process
  cp.kill()
})()
```

Then run the script with following command:

```sh
$ node birdseye/capture.js
```

It will store snapshot images in `birdseye/snapshots` for all component catalogs. You can visual regression test with the snapshots.

### Visual Regression Testing with [reg-suit](https://github.com/reg-viz/reg-suit)

[reg-suit](https://github.com/reg-viz/reg-suit) is a visual regression testing tool which compares snapshot images, stores snapshots on cloud storage (S3, GCS), etc. This section describes how to set up visual regiression testing with reg-suit and @birdseye/snapshot with storing snapshot images on S3. You may also want to read [the example repository of reg-suit](https://github.com/reg-viz/reg-puppeteer-demo).

Before using reg-suit, setup your AWS credentials. Set environment variables:

```sh
export AWS_ACCESS_KEY_ID=<your-access-key>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
```

Or create a file at `~/.aws/credentials`:

```sh
[default]
aws_access_key_id = <your-access-key>
aws_secret_access_key = <your-secret-key>
```

Install reg-suit and execute initialization command. The reg-suit CLI tool asks you several questions for set up:

```sh
$ npm install -D reg-suit
$ npx reg-suit init
```

After finishing reg-suit set up, run the following command for visual regression test:

```sh
$ node birdseye/capture.js && reg-suit run
```

## License

MIT
