export function dedupe(list: string[]): string[] {
  const set: Record<string, true> = {}
  return list.reduce<string[]>((acc, item) => {
    if (set[item]) {
      return acc
    }
    set[item] = true
    return acc.concat(item)
  }, [])
}
