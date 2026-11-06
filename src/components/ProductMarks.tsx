// Ícones oficiais dos produtos, copiados dos kits de marca. Mudou lá → muda aqui.
// Ordem: Harpia PDV, Harpia Control, Parças (manual, M10).
// Abaixo de 25 px os kits pedem outro desenho: estes não servem para esse tamanho.

// PDV: o ticket Picote sobre o violeta (brand/pdv/kit/icones/harpia-pdv-app-icon.svg)
export function PdvMark({ className = 'size-10' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 256 256" className={`shrink-0 ${className}`}>
      <rect width="256" height="256" rx="57.6" fill="#6a3be0" />
      <path
        transform="translate(48.65 60.86) scale(0.763)"
        fill="#fff"
        fillRule="evenodd"
        d="M36 0H76V20A28 28 0 0 0 132 20V0H172C191.883 0 208 16.1172 208 36V140C208 159.883 191.883 176 172 176H132V156A28 28 0 0 0 76 156V176H36C16.1172 176 0 159.883 0 140V36C0 16.1172 16.1172 0 36 0ZM122.0 88.0a18 18 0 1 0 -36 0a18 18 0 1 0 36 0Z"
      />
    </svg>
  )
}

// Control: a harpia com bico sobre o teal (brand/control/kit/icones/control-app-icon.svg)
export function ControlMark({ className = 'size-10' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 256 256" className={`shrink-0 ${className}`}>
      <rect width="256" height="256" rx="57.6" fill="#0b746d" />
      <path
        transform="translate(40 66.5) scale(0.7333)"
        fill="#f3fffd"
        d="M0 63C36 -21 204 -21 240 63C206 29 162 25 134 37L120 65L106 37C78 25 34 29 0 63ZM68 69L120 121L172 69V119L120 171L68 119Z"
      />
    </svg>
  )
}

// Parças: o número de peito com +1 sobre o cobalto (fellows/specs/marca/out/icone/parcas-icone.svg)
export function FellowsMark({ className = 'size-10' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 256 256" className={`shrink-0 ${className}`}>
      <rect width="256" height="256" rx="56" fill="#2447e8" />
      <g transform="translate(25.6 25.6) scale(0.8)">
        <path
          fill="#d9f44a"
          fillRule="evenodd"
          d="M22.64 63.20L213.00 38.14A14 14 0 0 1 228.71 50.19L245.41 177.09A14 14 0 0 1 233.36 192.80L43.00 217.86A14 14 0 0 1 27.29 205.81L10.59 78.91A14 14 0 0 1 22.64 63.20Z M23.27 83.29A8 8 0 1 0 39.13 81.20A8 8 0 1 0 23.27 83.29Z M201.73 59.79A8 8 0 1 0 217.59 57.70A8 8 0 1 0 201.73 59.79Z M38.41 198.30A8 8 0 1 0 54.27 196.21A8 8 0 1 0 38.41 198.30Z M216.87 174.80A8 8 0 1 0 232.73 172.71A8 8 0 1 0 216.87 174.80Z"
        />
        <path
          fill="#0e1320"
          d="M66.97 180.41 69.17 152.49 40.49 156.26 41.77 139.99 70.45 136.21 72.65 108.26 88.48 106.17 86.28 134.13 115 130.35 113.72 146.62 85 150.4 82.8 178.33ZM131.19 171.96 132.81 151.43 160.71 147.75 163.97 106.24 136.07 109.91 137.19 95.7Q144.67 94.3 152.89 91.29Q161.12 88.29 169.03 84.24Q176.95 80.2 183.3 75.95L192.17 74.78L186.7 144.33L212.27 140.97L210.65 161.5Z"
        />
      </g>
    </svg>
  )
}
