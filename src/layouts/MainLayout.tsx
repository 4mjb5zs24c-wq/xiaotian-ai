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
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#eef3f9] to-[#e3ebf5]">
      {/* ── Top Header ── */}
      <header className="flex items-center h-11 px-4 shrink-0 gap-4 border-b border-slate-200/40">
        <button
          className="lg:hidden text-slate-400 hover:text-slate-600 shrink-0"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={17} />
        </button>

        {/* Left: branding */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-bold text-[#236fa1]">天学网</span>
          <span className="text-[10px] text-slate-400">· 数字化教学</span>
          <span className="text-[9px] text-slate-300 ml-1">v2.8.1</span>
        </div>

        {/* Center: textbook & class selector */}
        <div className="flex items-center gap-3 text-[11px] ml-6">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">教材版本：</span>
            <button className="flex items-center gap-0.5 text-slate-600 font-medium hover:text-[#236fa1] transition-colors">
              人教版
              <ChevronDown size={11} />
            </button>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">当前班级：</span>
            <button className="flex items-center gap-0.5 text-slate-600 font-medium hover:text-[#236fa1] transition-colors">
              初一(1)班
              <ChevronDown size={11} />
            </button>
          </div>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-0.5">
          <button className="p-1.5 rounded-md text-slate-300 hover:text-slate-500 hover:bg-white/60 transition-colors">
            <Bell size={15} />
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors">
            <Download size={12} />
            下载APP
          </button>
          <button className="p-1.5 rounded-md text-slate-300 hover:text-slate-500 hover:bg-white/60 transition-colors">
            <Menu size={15} />
          </button>
          <button
            onClick={() => navigate('/ai-search')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500 text-white text-[11px] font-medium hover:bg-blue-600 transition-colors ml-1 shadow-sm shadow-blue-200"
          >
            <Sparkles size={12} />
            小天AI
          </button>
          {/* Mock window controls */}
          <span className="text-[9px] text-slate-300 ml-2 flex gap-1">
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

        {/* ── Sidebar (light blue) ── */}
        <aside
          className={clsx(
            'fixed inset-y-0 left-0 z-50 flex w-[135px] flex-col bg-gradient-to-b from-[#ebf5ff] to-[#dcecfa] transition-transform lg:static lg:z-auto lg:rounded-2xl lg:inset-auto overflow-hidden shrink-0 border border-[#cfe3f8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          {/* Teacher avatar */}
          <div className="flex flex-col items-center px-4 pt-6 pb-4">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#1E3A5F] text-base font-bold mb-2 ring-2 ring-[#bbd9ff]">
              王
            </div>
            <p className="text-[#1E3A5F] text-sm font-medium">王老师</p>
            <p className="text-[#6B86A8] text-[11px]">英语教研组</p>
          </div>

          {/* Nav items — icon on top, text below */}
          <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto">
            {topNavItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => {
                  const qIndex = to.indexOf('?')
                  const active = qIndex > -1
                    ? location.pathname + location.search === to
                    : isActive
                  return clsx(
                    'flex flex-col items-center gap-0.5 py-2.5 rounded-xl text-[10px] font-medium transition-all duration-200',
                    active
                      ? 'bg-white text-[#1677FF] border border-[#BBD9FF] shadow-[0_4px_12px_rgba(22,119,255,0.1)]'
                      : 'text-[#4F6F95] hover:bg-white/60 hover:text-[#1677FF]',
                  )
                }}
              >
                <Icon size={19} />
                {label}
              </NavLink>
            ))}

            {/* 更多功能 */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-[12px] font-medium text-[#4F6F95] hover:bg-white/70 hover:text-[#1677FF] w-full transition-colors"
              >
                <MoreHorizontal size={16} />
                更多功能
                <ChevronDown size={11} className={clsx('ml-auto transition-transform', moreOpen && 'rotate-180')} />
              </button>
              {moreOpen && (
                <div className="absolute left-2 right-2 top-full bg-white rounded-lg py-1 shadow-lg z-10 border border-[#cfe3f8]">
                  {[
                    { to: '/writing', label: '写作批改' },
                    { to: '/listening', label: '听力/听说' },
                    { to: '/ai-search', label: 'AI搜索' },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => { setSidebarOpen(false); setMoreOpen(false) }}
                      className="block px-4 py-2 text-[12px] text-[#4F6F95] hover:bg-[#f4faff] hover:text-[#1677FF] transition-colors"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Bottom controls */}
          {location.pathname !== '/' && (
            <div className="px-2.5 pb-4 space-y-0.5 mt-auto">
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] text-[#4F6F95]/60 hover:text-[#4F6F95] hover:bg-[#f4faff] w-full transition-colors">
                <ChevronLeft size={16} />
                返回
              </button>
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] text-[#4F6F95]/60 hover:text-[#4F6F95] hover:bg-[#f4faff] w-full transition-colors">
                <Minimize2 size={16} />
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
