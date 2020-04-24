import { Catalog } from '@birdseye/core'

export interface SnapshotOptions {
  delay?: number
  disableCssAnimation?: boolean
}

export interface CatalogRoute {
  path: string
  snapshot?: SnapshotOptions
}

export function snapshotPlugin(catalogs: Catalog[]): void {
  const routes = catalogs.reduce<CatalogRoute[]>((acc, catalog) => {
    const meta = catalog.toDeclaration().meta
    return acc.concat(
      meta.patterns.map(pattern => {
        return {
          path: `/${encodeURIComponent(meta.name)}/${encodeURIComponent(
            pattern.name
          )}`,
          snapshot: pattern.plugins.snapshot
        }
      })
    )
  }, [])

  const script = document.createElement('script')
  script.id = '__birdseye_routes__'
  script.type = 'application/json'
  script.textContent = JSON.stringify(routes)
  document.head.appendChild(script)
}

declare module '@birdseye/core/dist/interfaces' {
  interface PluginOptions {
    snapshot?: SnapshotOptions
  }
}
