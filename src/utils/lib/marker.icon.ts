const baseIcon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  aria-hidden="true"
  role="img"
  class="iconify iconify--logos"
  width="37.07"
  height="36"
  preserveAspectRatio="xMidYMid meet"
  viewBox="0 0 256 198"
  >
  <path
    fill="{{ CENTRAL_LiNE_COLOR }}"
    d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"
  ></path>
  <path fill="{{ MAIN_COLOR }}" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path>
  <path
    fill="{{ SUB_COLOR }}"
    d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"
  ></path>
</svg>`

export class MarkerIcon extends String {
  constructor(params: Partial<MarkerIconParams> = {}) {
    const fullParams = new MarkerIconParams(params)
    const icon = baseIcon
      .replace('{{ CENTRAL_LiNE_COLOR }}', fullParams.centralLineColor)
      .replace('{{ MAIN_COLOR }}', fullParams.mainColor)
      .replace('{{ SUB_COLOR }}', fullParams.subColor)
    super(`data:image/svg+xml;base64,${window.btoa(icon)}`)
  }
}

export class MarkerIconParams {
  centralLineColor: string
  mainColor: string
  subColor: string
  constructor(params: Partial<MarkerIconParams>) {
    this.centralLineColor = params.centralLineColor ?? '#41B883'
    this.mainColor = params.mainColor ?? '#41B883'
    this.subColor = params.subColor ?? '#35495E'
  }
}

// #41B883
// #35495E
