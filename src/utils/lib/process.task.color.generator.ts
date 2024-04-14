const START_HEX = '#ff1600'
const END_HEX = '#00ff16'

// #ff1600	#00ff16

export class ProcessTaskColors {
  private readonly _colors: Map<number, string>
  private static readonly _percents = 100
  private static readonly _regExpToConvertToRgb =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

  constructor() {
    this._colors = new Map()

    const startRGB = this.getRgbFromHex(START_HEX)
    const endRGB = this.getRgbFromHex(END_HEX)

    this.fillColors(startRGB, endRGB)
  }

  private getRgbFromHex(hex: string): IRGB {
    const match = ProcessTaskColors._regExpToConvertToRgb.exec(hex)

    if (!match) throw new Error(`Match Not Found: ${hex}`)

    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
    }
  }

  private fillColors(startRGB: IRGB, endRGB: IRGB) {
    const percents = ProcessTaskColors._percents

    for (let i = 0; i <= percents; i++) {
      const r = Math.round(startRGB.r + (i * (endRGB.r - startRGB.r)) / percents)
      const g = Math.round(startRGB.g + (i * (endRGB.g - startRGB.g)) / percents)
      const b = Math.round(startRGB.b + (i * (endRGB.b - startRGB.b)) / percents)

      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
      this._colors.set(i, hex)
    }
  }

  get(percent: number) {
    const color = this._colors.get(percent)

    if (!color) throw new Error(`Incorrect Percent ${percent}`)

    return color
  }
}

export const processTaskColors = new ProcessTaskColors()

interface IRGB {
  r: number
  g: number
  b: number
}
