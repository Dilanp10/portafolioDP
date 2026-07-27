# Portafolio — Dilan Perea

Portafolio personal con estética surrealista nocturna ("el sueño"): luna, estrellas,
nubes a la deriva y cada proyecto presentado como una puerta flotante a otro mundo.

## Stack

- [Vite](https://vite.dev/) + React
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (Framer Motion) para animaciones

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # build de producción en dist/
```

## Contenido

- Los proyectos se editan en un solo lugar: `src/data/proyectos.js`
  (nombre, lema, descripción, tecnologías, links de demo y repo, y qué
  escena SVG usa cada puerta).
- Las escenas ilustradas de cada proyecto viven en `src/components/Escenas.jsx`.
- **CV:** el botón "Descargar CV" apunta a `/CV_Dilan_Leonel_Perea.pdf`.
  Copia tu PDF a `public/CV_Dilan_Leonel_Perea.pdf` antes de desplegar.

## Deploy (Netlify)

El `netlify.toml` ya está configurado: basta con conectar el repo en Netlify
o arrastrar la carpeta `dist/` tras correr `npm run build`.
