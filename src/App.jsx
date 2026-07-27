import Sky from './components/Sky'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="grain relative">
      <Sky />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  )
}
