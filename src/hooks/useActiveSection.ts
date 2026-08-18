import { useEffect, useState } from 'react'

/** Retorna o id da seção atualmente visível, para o indicador do menu. */
export function useActiveSection(ids: readonly string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const handler = () => {
      const scrollY = window.scrollY + offset
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4

      if (atBottom) {
        setActive(sections[sections.length - 1].id)
        return
      }

      let current = sections[0].id
      for (const section of sections) {
        if (section.offsetTop <= scrollY) current = section.id
      }
      setActive(current)
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [ids, offset])

  return active
}
