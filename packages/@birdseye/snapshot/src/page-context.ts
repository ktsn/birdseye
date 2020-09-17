import { Page, ElementHandle, Mouse, Keyboard } from 'puppeteer'

type WithSelector<T extends (...args: any[]) => any> = (
  selector: string,
  ...args: Parameters<T>
) => ReturnType<T> | null

type ExposedElementHandleKeys = typeof elementHandleKeys[number]
type ExposedMouseKeys = typeof mouseKeys[number]
type ExposedKeyboardKeys = typeof keyboardKeys[number]

export type ExposedElementHandle = {
  [K in ExposedElementHandleKeys]: WithSelector<ElementHandle[K]>
}

export interface PageContext extends ExposedElementHandle {
  readonly mouse: Pick<Mouse, ExposedMouseKeys>
  readonly keyboard: Pick<Keyboard, ExposedKeyboardKeys>
}

const exposedKeyPrefix = '__birdseye_expose_'
const exposedMouseKeyPrefix = exposedKeyPrefix + 'mouse_'
const exposedKeyboardKeyPrefix = exposedKeyPrefix + 'keyboard_'
const exposedCaptureKey = exposedKeyPrefix + 'capture'

const elementHandleKeys = [
  'click',
  'focus',
  'hover',
  'press',
  'select',
  'tap',
  'type',
] as const

const mouseKeys = ['click', 'down', 'move', 'up'] as const

const keyboardKeys = ['down', 'up', 'press', 'sendCharacter', 'type'] as const

async function exposePageContext(page: Page): Promise<void> {
  await Promise.all([
    ...elementHandleKeys.map((key) => {
      return page.exposeFunction(
        exposedKeyPrefix + key,
        async (selector: string, ...args: any[]) => {
          const el = await page.$(selector)
          if (!el) {
            return null
          }
          return (el[key] as any)(...args)
        }
      )
    }),

    ...mouseKeys.map((key) => {
      return page.exposeFunction(
        exposedMouseKeyPrefix + key,
        async (...args: any[]) => {
          return (page.mouse[key] as any)(...args)
        }
      )
    }),

    ...keyboardKeys.map((key) => {
      return page.exposeFunction(
        exposedKeyboardKeyPrefix + key,
        (...args: any[]) => {
          return (page.keyboard[key] as any)(...args)
        }
      )
    }),
  ])
}

interface ExposeContext {
  routeIndex: number
  exposedKeyPrefix: string
  exposedMouseKeyPrefix: string
  exposedKeyboardKeyPrefix: string
  exposedCaptureKey: string
  elementHandleKeys: string[]
  mouseKeys: string[]
  keyboardKeys: string[]
}

export async function runCapture(
  page: Page,
  capture: () => Promise<void>,
  routeIndex: number
): Promise<void> {
  // Exposed function must be unique as the one exposed by another catalog can remain
  // because there is no page transition between catalog as they are hashed routes.
  await exposePageContext(page)
  await page.exposeFunction(exposedCaptureKey, capture)

  const exposeContext: ExposeContext = {
    routeIndex,
    exposedKeyPrefix,
    exposedMouseKeyPrefix,
    exposedKeyboardKeyPrefix,
    exposedCaptureKey,
    elementHandleKeys: (elementHandleKeys as unknown) as string[],
    mouseKeys: (mouseKeys as unknown) as string[],
    keyboardKeys: (keyboardKeys as unknown) as string[],
  }

  await page.evaluate(
    ({
      routeIndex,
      exposedKeyPrefix,
      exposedMouseKeyPrefix,
      exposedKeyboardKeyPrefix,
      exposedCaptureKey,
      elementHandleKeys,
      mouseKeys,
      keyboardKeys,
    }: ExposeContext) => {
      const captureOption =
        window.__birdseye_routes__[routeIndex]?.snapshot?.capture
      if (!captureOption) {
        return
      }

      const pageContext = {
        mouse: {},
        keyboard: {},
      } as PageContext

      elementHandleKeys.forEach((key) => {
        Object.defineProperty(pageContext, key, {
          get: () => (window as any)[exposedKeyPrefix + key],
        })
      })

      mouseKeys.forEach((key) => {
        Object.defineProperty(pageContext.mouse, key, {
          get: () => (window as any)[exposedMouseKeyPrefix + key],
        })
      })

      keyboardKeys.forEach((key) => {
        Object.defineProperty(pageContext.keyboard, key, {
          get: () => (window as any)[exposedKeyboardKeyPrefix + key],
        })
      })

      const captureInPage = (window as any)[exposedCaptureKey]
      return captureOption(pageContext, captureInPage)
    },
    exposeContext as any
  )
}
