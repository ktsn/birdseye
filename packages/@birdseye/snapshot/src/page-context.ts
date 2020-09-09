import { Page, ElementHandle } from 'puppeteer'

type WithSelector<T extends (...args: any[]) => any> = (
  selector: string,
  ...args: Parameters<T>
) => ReturnType<T> | null

type PageContextKeys = typeof pageContextKeys[number]

export type PageContext = {
  [K in PageContextKeys]: WithSelector<ElementHandle[K]>
}

const exposedKeyPrefix = '__birdseye_expose_'
const exposedCaptureKey = exposedKeyPrefix + 'capture'

const pageContextKeys = [
  'click',
  'focus',
  'hover',
  'press',
  'select',
  'tap',
  'type',
] as const

async function exposePageContext(
  page: Page,
  routeIndex: number
): Promise<void> {
  await Promise.all(
    pageContextKeys.map((key) => {
      return page.exposeFunction(
        exposedKeyPrefix + key + routeIndex,
        async (selector: string, ...args: any[]) => {
          const el = await page.$(selector)
          if (!el) {
            return null
          }
          return (el[key] as any)(...args)
        }
      )
    })
  )
}

export async function runCapture(
  page: Page,
  capture: () => Promise<void>,
  routeIndex: number
): Promise<void> {
  // Exposed function must be unique as the one exposed by another catalog can remain
  // because there is no page transition between catalog as they are hashed routes.
  await exposePageContext(page, routeIndex)
  await page.exposeFunction(exposedCaptureKey + routeIndex, capture)

  await page.evaluate(
    (
      routeIndex: number,
      exposedKeyPrefix: string,
      exposedCaptureKey: string,
      pageContextKeys: PageContextKeys[]
    ) => {
      const captureOption =
        window.__birdseye_routes__[routeIndex]?.snapshot?.capture
      if (!captureOption) {
        return
      }

      const pageContext = {} as PageContext
      pageContextKeys.forEach((key) => {
        Object.defineProperty(pageContext, key, {
          get: () => (window as any)[exposedKeyPrefix + key + routeIndex],
        })
      })

      const captureInPage = (window as any)[exposedCaptureKey + routeIndex]
      return captureOption(pageContext, captureInPage)
    },
    routeIndex,
    exposedKeyPrefix,
    exposedCaptureKey,
    (pageContextKeys as unknown) as string[]
  )
}
