import {
  ColorSpace,
  HSL,
  HWB,
  Jzazbz,
  JzCzHz,
  Lab,
  Lab_D65,
  LCH,
  OKLab,
  OKLCH,
  P3,
  sRGB,
  sRGB_Linear,
} from 'colorjs.io/fn'

ColorSpace.register(sRGB)
ColorSpace.register(sRGB_Linear)
ColorSpace.register(P3)
ColorSpace.register(LCH)
ColorSpace.register(OKLCH)
ColorSpace.register(Lab)
ColorSpace.register(Lab_D65)
ColorSpace.register(OKLab)
ColorSpace.register(HSL)
ColorSpace.register(HWB)
ColorSpace.register(Jzazbz)
ColorSpace.register(JzCzHz)

export interface Option {
  space: ColorSpace
  coordinates: readonly [string, string, string]
}

export const Options = {
  srgb: { space: sRGB, coordinates: ['r', 'g', 'b'] },
  srgb_linear: { space: sRGB_Linear, coordinates: ['r', 'g', 'b'] },
  p3: { space: P3, coordinates: ['r', 'g', 'b'] },
  lab: { space: Lab, coordinates: ['l', 'a', 'b'] },
  lab_d65: { space: Lab_D65, coordinates: ['l', 'a', 'b'] },
  oklab: { space: OKLab, coordinates: ['l', 'a', 'b'] }, // OKLab,
  lch: { space: LCH, coordinates: ['l', 'c', 'h'] }, // LCH,
  oklch: { space: OKLCH, coordinates: ['l', 'c', 'h'] }, // OKLCH,
  hsl: { space: HSL, coordinates: ['l', 's', 'h'] }, // HSL,
  // hsv: { space: HSV, coordinates: ["v", "s", "h"] }, // HSV,
  hwb: { space: HWB, coordinates: ['w', 'b', 'h'] }, // HWB,
  jzazbz: { space: Jzazbz, coordinates: ['jz', 'az', 'bz'] },
  jzczhz: { space: JzCzHz, coordinates: ['jz', 'cz', 'hz'] },
} as const satisfies Record<string, Option>
export type OptionsType = typeof Options
export type OptionKey = keyof OptionsType
