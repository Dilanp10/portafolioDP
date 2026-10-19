import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { proyectos } from '../data/proyectos'
import Escena from './Escenas'

function Enlaces({ p }) {
  return (
    <div className="mt-6 flex items-center gap-6 text-xs uppercase tracking-[0.25em]">
      {p.demo && (
        <a
          href={p.demo}
          target="_blank"
          rel="noreferrer"
          className="text-gold underline-offset-4 transition-colors hover:text-moon hover:underline"
        >
          Entrar al sueño ↗
        </a>
      )}
      <a
        href={p.repo}
        target="_blank"
        rel="noreferrer"
        className="text-mist underline-offset-4 transition-colors hover:text-moon hover:underline"
      >
        Código ↗
      </a>
    </div>
  )
}

function Chips({ tech }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {tech.map((t) => (
        <li
          key={t}
          className="border border-mist-dim/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-mist"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

// La "puerta": marco con escena SVG dentro, se ilumina al pasar el mouse
// y al cruzarla te lleva a la demo (o al código si no hay demo).
function Puerta({ p }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  // En touch no hay mouse que dispare el hover: cuando la puerta entra en
  // foco, mostramos la animación una vez (como una muestra de lo que hace
  // al tocarla) y la apagamos sola.
  useEffect(() => {
    if (!inView) return
    if (!window.matchMedia('(pointer: coarse)').matches) return
    setHovered(true)
    const t = setTimeout(() => setHovered(false), 2600)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <a
      ref={ref}
      href={p.demo || p.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir ${p.nombre}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative block aspect-4/3 overflow-hidden border bg-night-900/60 backdrop-blur-sm transition-all duration-500 ${
        hovered
          ? 'border-gold/60 shadow-[0_0_60px_-15px_rgba(227,199,120,0.3)]'
          : 'border-mist-dim/30'
      }`}
    >
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,var(--color-night-700)_0%,transparent_60%)] transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-60'
        }`}
      />
      <Escena nombre={p.escena} hovered={hovered} />
      <span
        className={`absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.25em] text-gold transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {p.demo ? 'Entrar al sueño ↗' : 'Ver código ↗'}
      </span>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9 }}
        className="mb-16 text-center md:mb-24"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">
          Cada puerta lleva a un mundo distinto
        </p>
        <h2 className="font-display text-5xl italic text-moon md:text-7xl">
          Sueños <span className="not-italic text-gold">construidos</span>
        </h2>
      </motion.header>

      <div className="grid gap-14 md:grid-cols-3 md:gap-8">
        {proyectos.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.12 }}
          >
            <Puerta p={p} />
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">{p.lema}</p>
            <h3 className="mt-2 font-display text-3xl text-moon">{p.nombre}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{p.descripcion}</p>
            {p.nota && (
              <p className="mt-2 text-[11px] italic leading-snug text-gold/70">{p.nota}</p>
            )}
            <Chips tech={p.tech} />
            <Enlaces p={p} />
          </motion.article>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 text-center font-display text-lg italic text-mist-dim"
      >
        Las demos viven en hosting gratuito: al abrirlas por primera vez pueden
        tardar unos segundos en despertar.
      </motion.p>
    </section>
  )
}
