import { useEffect, useState } from 'react'

interface NavItem {
  id: string
  label: string
}

interface Props { items: NavItem[] }

export default function InsightSideNav({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          )
          setActiveId(best.target.id)
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5] }
    )

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  return (
    <nav className="fixed left-[max(155px,calc((100vw-72rem-147px)/2+15px))] top-28 w-32 space-y-0.5 z-30 max-xl:hidden">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">页面导航</p>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] font-medium
              transition-all duration-200 border-l-2
              ${isActive
                ? 'text-blue-600 bg-blue-50 border-blue-500'
                : 'text-slate-500 border-transparent hover:bg-slate-50'}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-blue-500' : 'bg-slate-300'}`} />
            <span className="truncate">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
