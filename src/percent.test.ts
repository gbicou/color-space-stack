import { describe, it, expect } from 'vitest'
import { percent_coordinates } from '@/percent.ts'
import { Options } from '@/option.ts'

describe('percent_coordinates', () => {
  it('black in srgb', () => {
    const color = percent_coordinates([0, 0, 0], Options.srgb)
    expect(color.coords).toEqual([0, 0, 0])
  })

  it('white in srgb', () => {
    const color = percent_coordinates([100, 100, 100], Options.srgb)
    expect(color.coords).toEqual([1, 1, 1])
  })

  it('blue in srgb', () => {
    const color = percent_coordinates([0, 0, 100], Options.srgb)
    expect(color.coords).toEqual([0, 0, 1])
  })
})

describe('coordinates order', () => {
  it('HSL coordinates are l,s,h', () => {
    const l = percent_coordinates([100, 0, 0], Options.hsl)
    expect(l.coords).toEqual([0, 0, 100])

    const s = percent_coordinates([0, 100, 0], Options.hsl)
    expect(s.coords).toEqual([0, 100, 0])

    const h = percent_coordinates([0, 0, 100], Options.hsl)
    expect(h.coords).toEqual([360, 0, 0])
  })
})
