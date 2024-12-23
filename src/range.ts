export const range = (start: number, end: number, step = 1) =>
  Array.from(Array(Math.abs((end - start) / step) + 1), (_, i) => start + i * step)
