import { motion } from 'motion/react'

export default function Contact() {
  return (
    <section id="contacto" className="relative mx-auto max-w-3xl px-6 pb-16 pt-28 text-center md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9 }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">
          Todo sueño termina en un despertar
        </p>
        <h2 className="font-display text-5xl italic text-moon md:text-7xl">
          ¿Construimos <span className="not-italic text-gold">uno juntos</span>?
        </h2>
        <p className="mx-auto mt-8 max-w-md leading-relaxed text-mist">
          Estoy disponible para proyectos freelance y posiciones full-time.
          Escríbeme y hablemos.
        </p>

        <motion.a
          href="mailto:dilanperea10@gmail.com"
          whileHover={{ scale: 1.03 }}
          className="mt-10 inline-block border border-gold/60 bg-gold/5 px-10 py-4 font-display text-2xl italic text-gold transition-colors hover:bg-gold hover:text-night-950"
        >
          dilanperea10@gmail.com
        </motion.a>

        <div className="mt-10 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.25em] text-mist">
          <a
            href="https://github.com/Dilanp10"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            GitHub ↗
          </a>
          <a
            href="/CV_Dilan_Leonel_Perea.pdf"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            Descargar CV ↗
          </a>
        </div>
      </motion.div>

      <footer className="mt-28 border-t border-mist-dim/20 pt-8 text-center">
        <p className="font-display text-sm italic text-mist-dim">
          Dilan Perea · {new Date().getFullYear()} · Hecho a mano, soñado en Catamarca.
        </p>
      </footer>
    </section>
  )
}
