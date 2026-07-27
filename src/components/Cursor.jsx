import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// En escritorio: halo de luz que sigue al mouse, como una luciérnaga.
// En táctil: un destello dorado que florece donde tocás la pantalla.
export default function Cursor() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.2 })
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const move = (e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }
      window.addEventListener('mousemove', move)
      return () => window.removeEventListener('mousemove', move)
    }
    const tap = (e) => {
      const t = e.touches[0]
      if (!t) return
      setRipples((r) => [
        ...r.slice(-4),
        { id: Date.now() + Math.random(), x: t.clientX, y: t.clientY },
      ])
    }
    window.addEventListener('touchstart', tap, { passive: true })
    return () => window.removeEventListener('touchstart', tap)
  }, [x, y])

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-36 -mt-36 hidden size-72 rounded-full [@media(pointer:fine)]:block"
        style={{
          x: sx,
          y: sy,
          background:
            'radial-gradient(circle, rgba(227,199,120,0.10) 0%, rgba(227,199,120,0.04) 40%, transparent 70%)',
        }}
      />
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed z-50 size-40 rounded-full"
          style={{
            left: r.x - 80,
            top: r.y - 80,
            background:
              'radial-gradient(circle, rgba(227,199,120,0.35) 0%, rgba(227,199,120,0.12) 40%, transparent 70%)',
          }}
          initial={{ opacity: 0.9, scale: 0.3 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onAnimationComplete={() =>
            setRipples((rs) => rs.filter((it) => it.id !== r.id))
          }
        />
      ))}
    </>
  )
}
