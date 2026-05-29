import { useEffect } from 'react'
import { useAIStore } from '../store'
import DrawerHeader from './DrawerHeader'
import DrawerContent from './DrawerContent'

export default function AIDrawer() {
  const drawerOpen = useAIStore((s) => s.drawerOpen)
  const closeDrawer = useAIStore((s) => s.closeDrawer)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    if (drawerOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [drawerOpen, closeDrawer])

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[420px] max-w-[100vw] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <DrawerHeader />
        <DrawerContent />
      </div>
    </>
  )
}
