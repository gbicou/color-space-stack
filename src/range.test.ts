import { describe, it, expect } from 'vitest'
import { range } from '@/range.ts'

describe('range', () => {
  it('includes last item', () => {
    const r = range(1, 3)
    expect(r).toContain(3)
  })

  it('includes first item', () => {
    const r = range(1, 3)
    expect(r).toContain(1)
  })

  it('allows step', () => {
    const r = range(1, 3, 2)
    expect(r).toEqual([1, 3])

    const r2 = range(1, 10, 3)
    expect(r2).toEqual([1, 4, 7, 10])
  })
})
