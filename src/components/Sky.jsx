import { useMemo } from 'react'

// Cielo fijo detrás de todo: gradiente nocturno, estrellas que parpadean
// y nubes que cruzan la pantalla muy lento.
export default function Sky() {
  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.2 + 0.6,
        dur: Math.random() * 5 + 2.5,
        delay: Math.random() * 6,
        min: Math.random() * 0.15 + 0.05,
        max: Math.random() * 0.5 + 0.45,
      })),
    [],
  )

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 8 + i * 22 + Math.random() * 8,
        scale: 0.6 + Math.random() * 0.9,
        dur: 120 + Math.random() * 120,
        delay: -Math.random() * 180,
        opacity: 0.05 + Math.random() * 0.06,
      })),
    [],
  )

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,var(--color-night-700)_0%,var(--color-night-900)_45%,var(--color-night-950)_100%)]" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            '--star-dur': `${s.dur}s`,
            '--star-delay': `${s.delay}s`,
            '--star-min': s.min,
            '--star-max': s.max,
          }}
        />
      ))}

      {clouds.map((c) => (
        <svg
          key={c.id}
          className="cloud absolute left-0"
          style={{
            top: `${c.top}%`,
            opacity: c.opacity,
            scale: c.scale,
            '--cloud-dur': `${c.dur}s`,
            '--cloud-delay': `${c.delay}s`,
          }}
          width="320"
          height="90"
          viewBox="0 0 320 90"
          fill="none"
        >
          <ellipse cx="90" cy="60" rx="90" ry="26" fill="var(--color-moon)" />
          <ellipse cx="170" cy="45" rx="70" ry="30" fill="var(--color-moon)" />
          <ellipse cx="250" cy="60" rx="68" ry="22" fill="var(--color-moon)" />
        </svg>
      ))}
    </div>
  )
}
