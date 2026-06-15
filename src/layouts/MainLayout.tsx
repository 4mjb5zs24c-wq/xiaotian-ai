import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  BookOpen,
  FileCheck,
  XCircle,
  FileText,
  User,
  ChevronDown,
  ChevronLeft,
  Minimize2,
  Bell,
  Download,
  Menu,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react'
import clsx from 'clsx'
import { AIDrawer } from '../ai/components'
import AIAssistantDrawer from '../ai/components/AIAssistantDrawer'

const topNavItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/resources', label: '我的备课', icon: BookOpen },
  { to: '/reports', label: '智能阅卷', icon: FileCheck },
  { to: '/wrong-questions', label: '错题本', icon: XCircle },
  { to: '/wrong-words?tab=class', label: '班级错词本', icon: FileText },
  { to: '/wrong-words?tab=student', label: '学生个性化词本', icon: User },
]

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-[#e8f0fe]">
      {/* ── Top Header ── */}
      <header className="flex items-center h-12 px-4 bg-[#e8f0fe] shrink-0 gap-4">
        <button
          className="lg:hidden text-slate-500 hover:text-slate-700 shrink-0"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={18} />
        </button>

        {/* Left: branding */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-bold text-[#1a6fb5]">天学网</span>
          <span className="text-[11px] text-[#8aabcc]">· 数字化教学</span>
          <span className="text-[10px] text-slate-300 ml-1">v2.8.1</span>
        </div>

        {/* Center: textbook & class selector */}
        <div className="flex items-center gap-3 text-[12px] ml-6">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">教材版本：</span>
            <button className="flex items-center gap-0.5 text-slate-700 font-medium hover:text-[#1a6fb5] transition-colors">
              人教版
              <ChevronDown size={12} />
            </button>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">当前班级：</span>
            <button className="flex items-center gap-0.5 text-slate-700 font-medium hover:text-[#1a6fb5] transition-colors">
              初一(1)班
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-1">
          <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors">
            <Bell size={16} />
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-slate-500 hover:text-slate-700 hover:bg-white/60 transition-colors">
            <Download size={13} />
            下载APP
          </button>
          <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors">
            <Menu size={16} />
          </button>
          <button
            onClick={() => navigate('/ai-search')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500 text-white text-[11px] font-medium hover:bg-blue-600 transition-colors ml-1"
          >
            <Sparkles size={13} />
            小天AI
          </button>
          {/* Mock window controls */}
          <span className="text-[10px] text-slate-300 ml-2 flex gap-1">
            <span className="cursor-default" title="最小化">─</span>
            <span className="cursor-default" title="最大化">□</span>
            <span className="cursor-default" title="关闭">✕</span>
          </span>
        </div>
      </header>

      {/* ── Body: Sidebar + Main Content ── */}
      <div className="flex flex-1 min-h-0 px-3 pb-3">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Blue Sidebar ── */}
        <aside
          className={clsx(
            'fixed inset-y-0 left-0 z-50 flex w-[135px] flex-col bg-[#1a6fb5] transition-transform lg:static lg:z-auto lg:rounded-2xl lg:inset-auto overflow-hidden shrink-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          {/* Teacher avatar */}
          <div className="flex flex-col items-center px-4 pt-6 pb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold mb-2">
              王
            </div>
            <p className="text-white text-sm font-medium">王老师</p>
            <p className="text-blue-200 text-[11px]">英语教研组</p>
          </div>

          {/* Nav items — icon on top, text below */}
          <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
            {topNavItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => {
                  // For nav items with query strings, check exact match including search params
                  const qIndex = to.indexOf('?')
                  const active = qIndex > -1
                    ? location.pathname + location.search === to
                    : isActive
                  return clsx(
                    'flex flex-col items-center gap-0.5 py-2.5 rounded-xl text-[10px] font-medium transition-colors',
                    active
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white',
                  )
                }}
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}

            {/* 更多功能 */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-medium text-blue-100 hover:bg-white/10 hover:text-white w-full transition-colors"
              >
                <MoreHorizontal size={17} />
                更多功能
                <ChevronDown size={12} className={clsx('ml-auto transition-transform', moreOpen && 'rotate-180')} />
              </button>
              {moreOpen && (
                <div className="absolute left-2 right-2 top-full bg-[#1565a0] rounded-md py-1 shadow-lg z-10">
                  {[
                    { to: '/assignments', label: '作业列表' },
                    { to: '/writing', label: '写作批改' },
                    { to: '/listening', label: '听力/听说' },
                    { to: '/ai-search', label: 'AI搜索' },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => { setSidebarOpen(false); setMoreOpen(false) }}
                      className="block px-4 py-2 text-[12px] text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Bottom controls — hidden on homepage */}
          {location.pathname !== '/' && (
            <div className="px-2 pb-4 space-y-0.5">
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-blue-100 hover:bg-white/10 hover:text-white w-full transition-colors">
                <ChevronLeft size={17} />
                返回
              </button>
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-blue-100 hover:bg-white/10 hover:text-white w-full transition-colors">
                <Minimize2 size={17} />
                最小化
              </button>
            </div>
          )}
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 overflow-y-auto ml-3 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* ── AI Drawer (small, legacy) ── */}
      <AIDrawer />
      {/* ── AI Assistant Drawer (66vw, main AI workbench) ── */}
      <AIAssistantDrawer />
    </div>
  )
}
