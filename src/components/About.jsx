import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const habilidades = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'Git',
]

// Un ojo abierto que flota y sigue al mouse: el soñador que nunca duerme.
function Ojo() {
  const svgRef = useRef(null)
  // posición de iris y pupila en coordenadas del viewBox (centro: 100, 60)
  const ix = useMotionValue(100)
  const iy = useMotionValue(60)
  const six = useSpring(ix, { stiffness: 180, damping: 22 })
  const siy = useSpring(iy, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const move = (e) => {
        const el = svgRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy) || 1
        // el iris se desplaza hasta 12 unidades del viewBox hacia el mouse
        const max = 12 * Math.min(1, d / 150)
        ix.set(100 + (dx / d) * max)
        iy.set(60 + (dy / d) * max * 0.7)
      }
      window.addEventListener('mousemove', move)
      return () => window.removeEventListener('mousemove', move)
    }
    // Táctil: el ojo mira alrededor solo, como buscando a alguien.
    const mirar = () => {
      const ang = Math.random() * Math.PI * 2
      const r = 4 + Math.random() * 8
      ix.set(100 + Math.cos(ang) * r)
      iy.set(60 + Math.sin(ang) * r * 0.7)
    }
    const id = setInterval(mirar, 2200)
    return () => clearInterval(id)
  }, [ix, iy])

  return (
    <motion.div
      aria-hidden
      className="mx-auto w-40 md:w-52"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg ref={svgRef} viewBox="0 0 200 120">
        <path
          d="M10 60 C50 10 150 10 190 60 C150 110 50 110 10 60 Z"
          fill="var(--color-night-800)"
          stroke="var(--color-mist)"
          strokeWidth="2"
        />
        <motion.circle cx={six} cy={siy} r="26" fill="var(--color-gold)" opacity="0.9" />
        <motion.circle cx={six} cy={siy} r="12" fill="var(--color-night-950)" />
        <circle cx="108" cy="52" r="4" fill="var(--color-moon)" />
        <ellipse cx="100" cy="116" rx="40" ry="4" fill="black" opacity="0.35" />
      </svg>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="sobre-mi" className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9 }}
      >
        <Ojo />
        <p className="mb-4 mt-10 text-xs uppercase tracking-[0.35em] text-mist">El soñador</p>
        <h2 className="font-display text-5xl italic text-moon md:text-6xl">
          Sobre <span className="not-italic text-gold">mí</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl leading-relaxed text-mist">
          Soy Dilan Leonel Perea, desarrollador full stack de Catamarca, Argentina.
          Transformo ideas en aplicaciones robustas: paneles de administración,
          tiendas, CRMs y landing pages. Código mantenible, UX accesible y
          despliegue listo para producción.
        </p>
        <p className="mx-auto mt-4 max-w-xl font-display text-lg italic text-mist-dim">
          De día escribo código; de noche, el código me escribe a mí.
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        {habilidades.map((h, i) => (
          <motion.li
            key={h}
            animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            className="border border-mist-dim/40 bg-night-900/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-moon"
          >
            {h}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
