import { Catalog } from '@birdseye/core'
import { PageContext } from './page-context'

export interface SnapshotOptions {
  skip?: boolean
  target?: string
  delay?: number
  disableCssAnimation?: boolean
  capture?: (
    page: PageContext,
    capture: (target?: string) => Promise<void>
  ) => Promise<void>
}

export interface CatalogRoute {
  path: string
  snapshot?: SnapshotOptions
}

export function snapshotPlugin(catalogs: Catalog[]): void {
  const routes = catalogs.reduce<CatalogRoute[]>((acc, catalog) => {
    const meta = catalog.toDeclaration().meta
    return acc.concat(
      meta.patterns
        .filter((pattern) => {
          return !pattern.plugins.snapshot?.skip
        })
        .map((pattern) => {
          return {
            path: `/${encodeURIComponent(meta.name)}/${encodeURIComponent(
              pattern.name
            )}`,
            snapshot: pattern.plugins.snapshot,
          }
        })
    )
  }, [])

  window.__birdseye_routes__ = routes
}

declare global {
  interface Window {
    __birdseye_routes__: CatalogRoute[]
  }
}

declare module '@birdseye/core/dist/interfaces' {
  interface PluginOptions {
    snapshot?: SnapshotOptions
  }
}
