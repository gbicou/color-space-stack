import type { Option } from '@/option.ts'
import type { ColorObject, CoordMeta, Coords } from 'colorjs.io'
import { contrastWCAG21, display, sRGB } from 'colorjs.io/fn'

export function percent_coordinates(pct: [number, number, number], option: Option): ColorObject {
  const spaceCoords = Object.entries(option.space.coords) as [[string, CoordMeta], [string, CoordMeta], [string, CoordMeta]]
  const min = spaceCoords.map(([, c]) => (c.refRange ? c.refRange[0] : c.range ? c.range[0] : 0) ?? 0) as Coords
  const max = spaceCoords.map(([, c]) => (c.refRange ? c.refRange[1] : c.range ? c.range[1] : 0) ?? 1) as Coords

  // reorder coordinates to match color space
  const coord_1 = pct[option.coordinates.indexOf(spaceCoords[0][0])] ?? 0
  const coord_2 = pct[option.coordinates.indexOf(spaceCoords[1][0])] ?? 0
  const coord_3 = pct[option.coordinates.indexOf(spaceCoords[2][0])] ?? 0

  return {
    space: option.space,
    coords: [
      (coord_1 / 100) * ((max[0] ?? 1) - (min[0] ?? 0)) + (min[0] ?? 0),
      (coord_2 / 100) * ((max[1] ?? 1) - (min[1] ?? 0)) + (min[1] ?? 0),
      (coord_3 / 100) * ((max[2] ?? 1) - (min[2] ?? 0)) + (min[2] ?? 0),
    ],
  }
}

export function percent_to_css(pct: [number, number, number], option: Option): string {
  const color = percent_coordinates(pct, option)
  return display(color)
}

const black = { space: sRGB, coords: [0, 0, 0] } as ColorObject

export function percent_to_css_text(pct: [number, number, number], option: Option): string {
  const color = percent_coordinates(pct, option)
  const constrast = contrastWCAG21(color, black)
  return constrast >= 4.5 ? 'black' : 'white'
}
