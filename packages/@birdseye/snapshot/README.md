# @birdseye/snapshot

Taking snapshots for Birdseye catalog.

## Install

```sh
$ npm install --save-dev @birdseye/snapshot
```

## Usage

Before running capturing process, you need to pass `snapshotPlugin` in `plugins` option of `birdseye` function.

```js
import birdseye from '@birdseye/app'

// Import snapshot plugin
import { snapshotPlugin } from '@birdseye/snapshot/lib/plugin'

const load = (ctx: any) => ctx.keys().map((x: any) => ctx(x).default)
const catalogs = load(require.context('./catalogs', true, /\.catalog\.ts$/))

birdseye('#app', catalogs, {
  // Pass the plugin to birdseye function
  plugins: [snapshotPlugin]
})

```

Next, write `birdseye/capture.js` like below:

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

It will store snapshot images in `birdseye/snapshots` for all component catalogs. You can run visual regression test with the snapshots.

### Snapshot Options

You can specify snapshot options into your catalog to tweak capture behavior.

```js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton')
  .add('primary', {
    props: {
      primary: true
    },

    slots: {
      default: 'Button Text'
    },

    plugins: {
      snapshot: {
        // Specify snapshot options here
        delay: 1000
      }
    }
  })
```

All options should be into `plugins.snapshot` for each catalog settings.

Available snapshot options are below:

- `skip` Set `true` if you want to skip capturing for the catalog. (default `false`)
- `target` CSS selector for the element that will be captured. (default: the root element of the preview)
- `delay` A delay (ms) before taking snapshot.
- `disableCssAnimation` Disable CSS animations and transitions if `true`. (default `true`)
- `capture` A function to define interactions (e.g. `click`, `hover` etc. the an element) before capture. See [Triggering Interaction before Capture](#triggering-interaction-before-capture) for details.

### Triggering Interaction before Capture

There are cases that you want to manipulate a rendered catalog before capturing it. For example, capturing a hover style of a button, a focused style of a text field, etc.

You can trigger such manipulations with `capture` option:

```js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton')
  .add('primary', {
    props: {
      primary: true
    },

    slots: {
      default: 'Button Text'
    },

    plugins: {
      snapshot: {
        capture: async (page, capture) => {
          // Capture the regular style of the button.
          await capture()

          // Trigger a hover for the button. Specify the target elemenet with a CSS selector.
          // The below triggers a hover for an element with `my-button` class.
          await page.hover('.my-button')

          // Capture the button while it is hovered.
          await capture()
        }
      }
    }
  })
```

`capture` option is a function receiving two arguments - a page context and a capture function. The page context has methods to trigger manipulations for an element in the page. They are just aliases of [Puppeteer's ElementHandle methods](https://github.com/puppeteer/puppeteer/blob/v5.2.1/docs/api.md#class-elementhandle) except receiving the selector for the element as the first argument. Available methods are below:

- click
- focus
- hover
- press
- select
- tap
- type

The original method arguments are supposed to placed after the second argument. For example, if you write `el.click({ button: 'right' })` with Puppeteer, the equivalent is `page.click('.selector', { button: 'right' })`.

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
