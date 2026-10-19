import { motion } from 'motion/react'

const flotar = (delay = 0, dist = 8, dur = 5) => ({
  animate: { y: [0, -dist, 0] },
  transition: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
})

const ESTRELLAS = [
  [40, 40, 1.6],
  [80, 25, 1.2],
  [130, 55, 1],
  [260, 35, 1.3],
  [352, 112, 1.1],
  [20, 92, 1],
]

// Haku es el proyecto principal (la puerta grande): el cielo cobra vida al
// pasar el mouse — estrellas más despiertas, una estrella fugaz cruza el
// cielo, el resplandor del sol/luna crece, y el pin del mapa (Haku "te
// ubica") pulsa con un anillo de ubicación.
function Montanas({ hovered }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      {ESTRELLAS.map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-mist)"
          animate={{ opacity: hovered ? [0.3, 1, 0.3] : [0.15, 0.5, 0.15] }}
          transition={{
            duration: hovered ? 1.2 + i * 0.15 : 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}

      <motion.circle
        cx="310"
        cy="60"
        r="48"
        stroke="var(--color-gold)"
        strokeWidth="1"
        animate={{ opacity: hovered ? [0.25, 0.55, 0.25] : 0.3, scale: hovered ? [1, 1.15, 1] : 1 }}
        transition={{ duration: hovered ? 2 : 0.3, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
        style={{ originX: '310px', originY: '60px' }}
      />
      <circle cx="310" cy="60" r="34" fill="var(--color-gold)" opacity="0.85" />

      <path d="M-10 240 L90 110 L150 190 L220 80 L300 240 Z" fill="var(--color-night-700)" />
      <path d="M120 240 L230 130 L320 240 Z" fill="var(--color-night-600)" opacity="0.8" />

      {/* estrella fugaz: sólo cruza el cielo en hover */}
      <motion.path
        d="M220 80 L232 98 L244 116"
        stroke="var(--color-moon)"
        strokeWidth="2.5"
        opacity="0.3"
        strokeLinecap="round"
        animate={
          hovered
            ? { x: [0, 90], y: [0, 46], opacity: [0, 0.9, 0] }
            : { x: 0, y: 0, opacity: 0.3 }
        }
        transition={
          hovered
            ? { duration: 1.1, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.7 }
            : { duration: 0.3 }
        }
      />

      <motion.g {...flotar(0, hovered ? 6 : 10, hovered ? 2.2 : 4.5)}>
        <path
          d="M200 40 C186 40 176 51 176 64 C176 82 200 104 200 104 C200 104 224 82 224 64 C224 51 214 40 200 40 Z"
          fill="var(--color-gold)"
        />
        <circle cx="200" cy="63" r="8" fill="var(--color-night-900)" />
      </motion.g>
      {/* anillo de ubicación del pin, sólo visible en hover */}
      <motion.circle
        cx="200"
        cy="64"
        r="16"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        animate={{ opacity: hovered ? [0.15, 0.6, 0.15] : 0, scale: hovered ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '200px', originY: '64px' }}
      />

      <ellipse cx="200" cy="116" rx="18" ry="3.5" fill="black" opacity="0.4" />
    </svg>
  )
}

function Mascota({ hovered }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <g transform="translate(300, 62)">
          <motion.g
            animate={{ rotate: hovered ? [0, 360] : 0 }}
            transition={
              hovered
                ? { duration: 3, repeat: Infinity, ease: 'linear' }
                : { duration: 0.4, ease: 'easeOut' }
            }
          >
            <circle cx="0" cy="0" r="30" fill="var(--color-moon)" />
            <circle cx="-10" cy="-10" r="6" fill="var(--color-night-800)" opacity="0.5" />
            <circle cx="4" cy="-14" r="4.5" fill="var(--color-night-800)" opacity="0.5" />
            <circle cx="14" cy="-4" r="4.5" fill="var(--color-night-800)" opacity="0.5" />
            <ellipse cx="1" cy="10" rx="10" ry="8" fill="var(--color-night-800)" opacity="0.5" />
          </motion.g>
        </g>
      </motion.g>
      <path
        d="M150 196 C148 168 156 150 172 142 C166 130 168 118 178 112 C174 104 178 94 188 92 C198 90 206 98 204 108 C214 112 218 124 212 134 C228 144 234 164 232 196 Z"
        fill="var(--color-night-600)"
      />
      <path d="M178 112 C170 108 164 110 160 118" stroke="var(--color-night-600)" strokeWidth="7" strokeLinecap="round" />
      <path d="M232 190 C246 186 252 176 250 166" stroke="var(--color-night-600)" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="192" cy="200" rx="52" ry="5" fill="black" opacity="0.35" />
    </svg>
  )
}

function Cajas({ hovered }) {
  const caja = (x, y, s, delay) => (
    <motion.g
      animate={{
        y: hovered ? [0, -25, 2, 0] : [0, -9, 0],
        rotate: hovered ? [0, -5, 3, 0] : 0,
      }}
      transition={{
        duration: hovered ? 0.7 : 5 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: hovered ? delay * 0.12 : delay,
      }}
      style={{ x, y, scale: s }}
    >
      <rect width="52" height="52" fill="var(--color-night-600)" stroke="var(--color-mist)" strokeWidth="1.5" />
      <path d="M0 0 L12 -10 L64 -10 L52 0 Z" fill="var(--color-night-700)" stroke="var(--color-mist)" strokeWidth="1.5" />
      <path d="M52 0 L64 -10 L64 42 L52 52 Z" fill="var(--color-night-800)" stroke="var(--color-mist)" strokeWidth="1.5" />
      <path d="M20 14 H32 M26 8 V20" stroke="var(--color-gold)" strokeWidth="2" />
    </motion.g>
  )
  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <circle cx="330" cy="50" r="20" fill="var(--color-moon)" opacity="0.45" />
      {caja(110, 130, 1, 0)}
      {caja(200, 70, 0.75, 0.8)}
      {caja(270, 140, 0.9, 1.6)}
      <ellipse cx="200" cy="206" rx="90" ry="6" fill="black" opacity="0.3" />
    </svg>
  )
}

function ArbolNodos({ hovered }) {
  const conexiones = [
    [200, 50, 130, 110],
    [200, 50, 270, 110],
    [130, 110, 90, 175],
    [130, 110, 170, 175],
    [270, 110, 240, 175],
    [270, 110, 310, 175],
  ]

  const nodo = (cx, cy, r, delay, color = 'var(--color-moon)') => (
    <motion.g {...flotar(delay, 6, 5 + delay * 0.5)}>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r + 12}
        fill={color}
        animate={{ opacity: hovered ? [0, 0.3, 0] : 0 }}
        transition={
          hovered
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.25 }
            : { duration: 0.3 }
        }
      />
      <circle cx={cx} cy={cy} r={r} fill={color} opacity="0.9" />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r + 6}
        stroke={color}
        fill="none"
        animate={{
          opacity: hovered ? [0.25, 0.9, 0.25] : 0.25,
          strokeWidth: hovered ? [1, 2.5, 1] : 1,
        }}
        transition={
          hovered
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.25 }
            : { duration: 0.3 }
        }
      />
    </motion.g>
  )

  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <circle cx="340" cy="44" r="18" fill="var(--color-gold)" opacity="0.4" />
      {conexiones.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--color-mist)"
          strokeWidth="1.5"
          animate={{ opacity: hovered ? [0.3, 0.7, 0.3] : 0.3 }}
          transition={
            hovered
              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
              : { duration: 0.3 }
          }
        />
      ))}
      {nodo(200, 50, 14, 0, 'var(--color-gold)')}
      {nodo(130, 110, 11, 0.4)}
      {nodo(270, 110, 11, 0.8)}
      {nodo(90, 175, 9, 1.2)}
      {nodo(170, 175, 9, 1.6)}
      {nodo(240, 175, 9, 0.6)}
      {nodo(310, 175, 9, 1.0)}
      <motion.path
        d="M193 50 L198 55 L208 45"
        stroke="var(--color-night-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...flotar(0, 6, 5)}
      />
      <ellipse cx="200" cy="210" rx="80" ry="5" fill="black" opacity="0.3" />
    </svg>
  )
}

function Mando({ hovered }) {
  const boton = (cx, cy, delay, color = 'var(--color-gold)') => (
    <motion.circle
      cx={cx}
      cy={cy}
      r="6"
      fill={color}
      animate={{ opacity: hovered ? [0.35, 1, 0.35] : 0.6, scale: hovered ? [1, 1.25, 1] : 1 }}
      transition={
        hovered
          ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay }
          : { duration: 0.3 }
      }
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    />
  )

  const etiqueta = (x, y, s, delay) => (
    <motion.g
      style={{ x, y, scale: s }}
      animate={{ rotate: hovered ? [-17, 17, -17] : [-6, 6, -6] }}
      transition={{
        duration: hovered ? 1 : 4.5 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay * 0.5,
      }}
    >
      <line x1="0" y1="0" x2="0" y2="18" stroke="var(--color-mist)" strokeWidth="1.5" opacity="0.55" />
      <g transform="translate(-22, 18)">
        <path
          d="M14 0 L40 0 A5 5 0 0 1 45 5 L45 27 A5 5 0 0 1 40 32 L14 32 L0 16 Z"
          fill="var(--color-moon)"
        />
        <circle cx="11" cy="16" r="3" fill="var(--color-night-900)" />
        <g stroke="var(--color-night-900)" strokeWidth="2" fill="none" strokeLinecap="round">
          <circle cx="24" cy="11" r="3" />
          <circle cx="34" cy="21" r="3" />
          <line x1="36" y1="8" x2="22" y2="24" />
        </g>
      </g>
    </motion.g>
  )

  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <circle cx="58" cy="52" r="17" fill="var(--color-moon)" opacity="0.4" />
      {etiqueta(140, 34, 1, 0)}
      {etiqueta(272, 44, 0.85, 1)}
      <g transform="translate(200, 148)">
        <motion.g
          animate={{
            rotate: hovered ? [-4, 4, -4] : [-1.5, 1.5, -1.5],
            y: [0, -6, 0],
          }}
          transition={{ duration: hovered ? 1.1 : 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-42 -26 H42 C60 -26 72 -12 74 8 C77 28 68 42 54 40 C42 38 36 24 28 14 H-28 C-36 24 -42 38 -54 40 C-68 42 -77 28 -74 8 C-72 -12 -60 -26 -42 -26 Z"
            fill="var(--color-night-600)"
            stroke="var(--color-mist)"
            strokeWidth="1.5"
          />
          <rect x="-49" y="-10" width="22" height="8" fill="var(--color-night-800)" />
          <rect x="-42" y="-17" width="8" height="22" fill="var(--color-night-800)" />
          {boton(38, -18, 0)}
          {boton(50, -6, 0.22, 'var(--color-moon)')}
          {boton(38, 6, 0.44)}
          {boton(26, -6, 0.66, 'var(--color-moon)')}
          <circle cx="-8" cy="-6" r="2.5" fill="var(--color-mist)" opacity="0.6" />
          <circle cx="8" cy="-6" r="2.5" fill="var(--color-mist)" opacity="0.6" />
        </motion.g>
      </g>
      <ellipse cx="200" cy="212" rx="76" ry="6" fill="black" opacity="0.32" />
    </svg>
  )
}

// Un plato se despega de la mesa y flota como holograma: el anillo de
// escaneo AR y las líneas verticales cobran vida al pasar el mouse.
function Holograma({ hovered }) {
  const linea = (x, delay, key) => (
    <motion.line
      key={key}
      x1={x}
      y1="58"
      x2={x}
      y2="168"
      stroke="var(--color-gold)"
      strokeWidth="1"
      animate={{ opacity: hovered ? [0, 0.5, 0] : 0 }}
      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )

  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <circle cx="330" cy="46" r="20" fill="var(--color-moon)" opacity="0.4" />

      {/* mesa */}
      <ellipse cx="200" cy="196" rx="130" ry="16" fill="var(--color-night-700)" />
      <ellipse
        cx="200"
        cy="192"
        rx="130"
        ry="16"
        stroke="var(--color-mist-dim)"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* anillo de escaneo AR, apoyado en la mesa */}
      <motion.ellipse
        cx="200"
        cy="178"
        rx="90"
        ry="19"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        animate={{
          opacity: hovered ? [0.2, 0.75, 0.2] : [0.15, 0.35, 0.15],
          scale: hovered ? [1, 1.06, 1] : 1,
        }}
        transition={{ duration: hovered ? 1.3 : 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '200px', originY: '178px' }}
      />

      {[160, 200, 240].map((x, i) => linea(x, i * 0.22, x))}

      {/* el plato: flota siempre, gira como el modelo 3D real al pasar el mouse */}
      <motion.g
        style={{ originX: '200px', originY: '112px' }}
        animate={{ y: [0, -10, 0], rotate: hovered ? 360 : 0 }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: hovered
            ? { duration: 2.6, repeat: Infinity, ease: 'linear' }
            : { duration: 0.5, ease: 'easeOut' },
        }}
      >
        <ellipse cx="200" cy="128" rx="48" ry="10" fill="var(--color-gold)" opacity="0.14" />
        <ellipse cx="200" cy="120" rx="46" ry="15" fill="var(--color-moon)" />
        <ellipse cx="200" cy="118" rx="30" ry="9" fill="var(--color-night-800)" opacity="0.5" />
        <path
          d="M186 116 Q200 123 214 116"
          stroke="var(--color-moon-dim)"
          strokeWidth="2"
          opacity="0.7"
        />
      </motion.g>

      <ellipse cx="200" cy="214" rx="112" ry="6" fill="black" opacity="0.3" />
    </svg>
  )
}

const escenas = {
  montanas: Montanas,
  mascota: Mascota,
  cajas: Cajas,
  arbolNodos: ArbolNodos,
  mando: Mando,
  holograma: Holograma,
}

export default function Escena({ nombre, hovered }) {
  const Comp = escenas[nombre]
  return Comp ? <Comp hovered={hovered} /> : null
}
