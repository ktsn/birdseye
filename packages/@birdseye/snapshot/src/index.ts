import * as path from 'path'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as puppeteer from 'puppeteer'
import { createCaptureStream } from 'capture-all'
import { CatalogRoute } from './plugin'
import { runCapture } from './page-context'

export interface SnapshotOptions {
  url: string
  snapshotDir?: string
  viewport?: {
    width: number
    height: number
  }
}

const previewSelector = '#__birdseye_preview__'

function fillOptionDefaults(
  options: SnapshotOptions
): Required<SnapshotOptions> {
  return {
    snapshotDir: 'birdseye/snapshots',
    viewport: {
      width: 800,
      height: 600,
    },
    ...options,
  }
}

export async function snapshot(options: SnapshotOptions): Promise<void> {
  const opts = fillOptionDefaults(options)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(opts.url)

  // Get all snapshot options from catalogs.
  const rawRoutes: CatalogRoute[] = await page.evaluate(() => {
    return window.__birdseye_routes__
  })
  const routes = rawRoutes.filter((route) => !route.snapshot?.skip)

  await browser.close()

  return new Promise((resolve, reject) => {
    const stream = createCaptureStream(
      routes.map((route, i) => {
        const snapshot = route.snapshot ?? {}
        // capture option becomes '{} | undefined' as Function is not serializable.
        const hasCapture = !!snapshot.capture

        return {
          url: opts.url + '#' + route.path + '?fullscreen=1',
          target: snapshot.target ?? previewSelector,
          viewport: opts.viewport,
          delay: snapshot.delay,
          disableCssAnimation: snapshot.disableCssAnimation,
          capture: hasCapture
            ? (page, capture) => runCapture(page, capture, i)
            : undefined,
        }
      })
    )

    mkdirp.sync(opts.snapshotDir)

    stream.on('data', (result) => {
      const hash = decodeURIComponent(result.url.split('#')[1])
      const normalized = hash
        .slice(1)
        .replace(/\?fullscreen=1$/, '')
        .replace(/[^0-9a-zA-Z]/g, '_')
      const dest = path.join(
        opts.snapshotDir,
        normalized + '_' + (result.index + 1) + '.png'
      )

      fs.writeFile(dest, result.image, (error) => {
        if (error) {
          stream.destroy()
          reject(error)
        }
      })
    })

    stream.on('error', reject)
    stream.on('end', resolve)
  })
}
