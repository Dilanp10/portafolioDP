import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'motion/react'

function Moon({ style }) {
  return (
    <motion.svg
      aria-hidden
      style={style}
      className="absolute left-[3%] top-[7%] w-[min(24vw,230px)] max-md:left-1/2 max-md:top-[3%] max-md:w-32 max-md:-translate-x-1/2"
      viewBox="0 0 400 400"
      fill="none"
    >
      <circle cx="200" cy="200" r="196" fill="var(--color-gold)" opacity="0.06" />
      <circle cx="200" cy="200" r="150" fill="var(--color-gold)" opacity="0.08" />
      <circle cx="200" cy="200" r="110" fill="var(--color-moon)" />
      <circle cx="165" cy="170" r="16" fill="var(--color-moon-dim)" opacity="0.6" />
      <circle cx="230" cy="230" r="24" fill="var(--color-moon-dim)" opacity="0.45" />
      <circle cx="205" cy="140" r="9" fill="var(--color-moon-dim)" opacity="0.5" />
      <circle cx="160" cy="245" r="11" fill="var(--color-moon-dim)" opacity="0.5" />
    </motion.svg>
  )
}

// La puerta solitaria en el horizonte, à la Magritte. Cruzarla baja a los proyectos.
function Door({ style }) {
  return (
    <motion.a
      href="#proyectos"
      aria-label="Cruzar la puerta: ir a los proyectos"
      style={style}
      className="absolute right-[7%] top-[17%] w-20 cursor-pointer transition-[filter] duration-300 hover:brightness-150 hover:drop-shadow-[0_0_25px_rgba(227,199,120,0.35)] md:bottom-[12%] md:right-[8%] md:top-auto md:w-40 lg:w-52"
    >
      <svg viewBox="0 0 160 260" fill="none" className="h-auto w-full">
      {/* luz que se escapa por la puerta entreabierta */}
      <polygon points="64,18 148,250 8,250" fill="var(--color-gold)" opacity="0.07" />
      <rect x="30" y="14" width="86" height="228" rx="3" stroke="var(--color-mist)" strokeWidth="2.5" fill="var(--color-night-900)" />
      <rect x="40" y="24" width="66" height="208" rx="2" fill="var(--color-night-800)" />
      <rect x="46" y="34" width="54" height="86" rx="1.5" stroke="var(--color-mist-dim)" strokeWidth="1.5" />
      <rect x="46" y="132" width="54" height="92" rx="1.5" stroke="var(--color-mist-dim)" strokeWidth="1.5" />
      <circle cx="96" cy="128" r="4" fill="var(--color-gold)" />
      {/* la sombra que no corresponde a la puerta */}
      <ellipse cx="80" cy="248" rx="58" ry="6" fill="black" opacity="0.35" />
      </svg>
    </motion.a>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 50, damping: 20 })
  const smy = useSpring(my, { stiffness: 50, damping: 20 })

  const moonX = useTransform(smx, [-0.5, 0.5], [18, -18])
  const moonY = useTransform(smy, [-0.5, 0.5], [10, -10])
  const doorX = useTransform(smx, [-0.5, 0.5], [-14, 14])
  const doorY = useTransform(smy, [-0.5, 0.5], [-8, 8])

  // En el celular no hay mouse: la luna y la puerta responden al giroscopio.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) return
    const clamp = (v) => Math.max(-0.5, Math.min(0.5, v))
    const onOrient = (e) => {
      if (e.gamma == null || e.beta == null) return
      mx.set(clamp(e.gamma / 50))
      my.set(clamp((e.beta - 45) / 50))
    }
    window.addEventListener('deviceorientation', onOrient)
    return () => window.removeEventListener('deviceorientation', onOrient)
  }, [mx, my])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const rise = useTransform(scrollYProgress, [0, 1], [0, -120])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6"
    >
      <Moon style={{ x: moonX, y: moonY }} />
      <Door style={{ x: doorX, y: doorY }} />

      <motion.div
        style={{ opacity: fade, y: rise }}
        className="relative z-10 max-w-4xl text-center max-md:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-mist"
        >
          Desarrollador full stack · Catamarca, Argentina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-6xl leading-[0.95] text-moon md:text-8xl lg:text-9xl"
        >
          Dilan <em className="text-gold">Perea</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl font-display text-xl italic leading-relaxed text-mist md:text-2xl"
        >
          Construyo aplicaciones que parecen sueños
          <span className="text-moon"> y funcionan como relojes.</span>
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          href="#proyectos"
          className="mt-12 inline-block border border-mist-dim px-8 py-3 text-xs uppercase tracking-[0.3em] text-moon transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
        >
          Cruzar la puerta
        </motion.a>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mist-dim"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
