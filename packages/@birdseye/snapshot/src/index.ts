import * as path from 'path'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as puppeteer from 'puppeteer'
import { createCaptureStream } from 'capture-all'

export interface SnapshotOptions {
  url: string
  snapshotDir?: string
  viewport?: {
    width: number
    height: number
  }
}

const previewSelector = '#__birdseye_preview__'
const routesScriptSelector = '#__birdseye_routes__'

function fillOptionDefaults(
  options: SnapshotOptions
): Required<SnapshotOptions> {
  return {
    snapshotDir: 'birdseye/snapshots',
    viewport: {
      width: 800,
      height: 600
    },
    ...options
  }
}

export async function snapshot(options: SnapshotOptions): Promise<void> {
  const opts = fillOptionDefaults(options)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(opts.url)

  const frame = await page.mainFrame()
  await frame.waitFor(routesScriptSelector)

  const routes: string[] = await frame.$eval(
    routesScriptSelector,
    (el: Element) => {
      return JSON.parse(el.textContent || '[]')
    }
  )

  await browser.close()

  return new Promise((resolve, reject) => {
    const stream = createCaptureStream(
      routes.map(route => {
        return {
          url: opts.url + '#' + route + '?fullscreen=1',
          target: previewSelector
        }
      })
    )

    mkdirp.sync(opts.snapshotDir)

    stream.on('data', result => {
      const hash = decodeURIComponent(result.url.split('#')[1])
      const normalized = hash.slice(1).replace(/[^0-9a-zA-Z]/g, '_')
      const dest = path.join(opts.snapshotDir, normalized + '.png')

      fs.writeFile(dest, result.image, error => {
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
