import { GridBackground } from '@/components/common/GridBackground'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { Projects } from '@/components/sections/Projects'
import { Process } from '@/components/sections/Process'
import { Experience } from '@/components/sections/Experience'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#02171C]"
      >
        Pular para o conteúdo
      </a>

      <GridBackground />
      <Header />

      <main id="conteudo">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Process />
        <Experience />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
