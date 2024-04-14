const baseIcon = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="800px" height="800px" viewBox="-3 0 24 24" version="1.1" id="svg1" sodipodi:docname="map-marker-alt-svgrepo-com.svg" inkscape:version="1.3.1 (91b66b0783, 2023-11-16)" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
	<defs id="defs1" />
	<namedview id="namedview1"   inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" inkscape:zoom="0.80125" inkscape:cx="400" inkscape:cy="400" inkscape:window-width="1600" inkscape:window-height="837" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="svg1" />
	<path style="fill:{{ MAIN_COLOR }}" d="m8.075 23.52c-6.811-9.878-8.075-10.891-8.075-14.52 0-4.971 4.029-9 9-9s9 4.029 9 9c0 3.629-1.264 4.64-8.075 14.516-.206.294-.543.484-.925.484s-.719-.19-.922-.48l-.002-.004zm.925-10.77c2.07 0 3.749-1.679 3.749-3.75s-1.679-3.75-3.75-3.75-3.75 1.679-3.75 3.75c0 2.071 1.679 3.75 3.75 3.75z" id="path1"  />
	<path style="fill:{{ SUB_COLOR }}; stroke-width:1.24805" d="m 388.14353,423.68343 c -52.1059,-5.04711 -94.70103,-41.73536 -108.8269,-93.73532 -3.99102,-14.69169 -4.02034,-45.63541 -0.0568,-59.96425 6.34641,-22.94342 16.91941,-41.45541 32.70041,-57.25427 68.53721,-68.6148 182.85466,-37.24305 208.76431,57.29048 3.93791,14.36781 3.88474,45.28462 -0.10335,60.08913 -3.54567,13.16221 -12.05744,31.40419 -19.55742,41.91446 -25.56674,35.82857 -69.38818,55.8764 -112.92023,51.65977 z" id="path2" transform="matrix(0.03,0,0,0.03,-3,0)" />
</svg>
`

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
