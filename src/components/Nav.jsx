const links = [
  { href: '#proyectos', label: 'Sueños' },
  { href: '#sobre-mi', label: 'El soñador' },
  { href: '#contacto', label: 'Despertar' },
]

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-5 md:px-12">
      <a
        href="#inicio"
        className="font-display text-lg italic tracking-wide text-moon transition-colors hover:text-gold md:text-xl"
      >
        D. Perea
      </a>
      <ul className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-mist md:gap-10 md:text-xs md:tracking-[0.25em]">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="transition-colors hover:text-gold">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
