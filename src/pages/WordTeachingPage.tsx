import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen, Volume2, X, Search, ChevronDown, EyeOff, Eye } from 'lucide-react'

interface WordData {
  word: string
  tags: string[]
  phoneticUK: string
  phoneticUS: string
  partOfSpeech: string
  definition: string
  example: string
  exampleCn: string
  source: string
  moreExamples: string[]
  phrases: { phrase: string; meaning: string }[]
  formationRules: string[]
  pronunciationRules: string[]
}

const wordDatabase: Record<string, WordData> = {
  apple: {
    word: 'apple',
    tags: ['课标词', '初中/高中', '词频4'],
    phoneticUK: '[ˈæpl]',
    phoneticUS: '[ˈæpl]',
    partOfSpeech: 'n.',
    definition: '[C]苹果',
    example: 'I think John likes strawberries and apples.',
    exampleCn: '我认为约翰喜欢草莓和苹果。',
    source: '人教七上U6',
    moreExamples: [
      'She eats an apple every morning.',
      'The apple is red and sweet.',
      'An apple a day keeps the doctor away.',
    ],
    phrases: [
      { phrase: "the apple of sb's eye", meaning: '心肝宝贝；掌上明珠' },
      { phrase: 'an apple a day', meaning: '一天一苹果' },
      { phrase: 'apple pie', meaning: '苹果派' },
      { phrase: 'bad apple', meaning: '害群之马；坏人' },
    ],
    formationRules: [
      'apple 是基础名词，可组成复合词或固定搭配。',
      'apple + pie → apple pie 苹果派',
      'apple + tree → apple tree 苹果树',
      'pineapple 中虽然包含 apple，但词义完全不同，指菠萝。',
    ],
    pronunciationRules: [
      'apple 中 a 发 /æ/，pp 发 /p/，le 结尾弱读。',
      '/æ/ 是前元音，开口度较大，类似中文"哎"。',
      '同音词示例：map /mæp/、cat /kæt/、cap /kæp/',
    ],
  },
  restaurant: {
    word: 'restaurant',
    tags: ['课标词', '初中/高中', '词频3'],
    phoneticUK: '[ˈrestrɒnt]',
    phoneticUS: '[ˈrestərɑːnt]',
    partOfSpeech: 'n.',
    definition: '[C]餐馆；餐厅',
    example: 'We had dinner at a restaurant.',
    exampleCn: '我们在餐馆吃了晚餐。',
    source: '人教七下U10',
    moreExamples: [
      'There is a new restaurant near our school.',
      'They went to a French restaurant last night.',
    ],
    phrases: [
      { phrase: 'fast food restaurant', meaning: '快餐店' },
      { phrase: 'family restaurant', meaning: '家庭餐厅' },
      { phrase: 'restaurant chain', meaning: '连锁餐厅' },
    ],
    formationRules: [
      'restaurant 源自法语 restaurer（恢复），原指恢复体力的地方。',
      '常见搭配：go to a restaurant、eat at a restaurant',
      '不可数用法：restaurant food（餐厅食物）',
    ],
    pronunciationRules: [
      'restaurant 中 r 在英式发音中不发音，美式中发音。',
      '重音在第一音节，/au/ 发 /ɒ/ 或 /ɑː/。',
      '结尾 -ant 发 /ɒnt/ 或 /ənt/。',
    ],
  },
  wednesday: {
    word: 'Wednesday',
    tags: ['课标词', '初中', '词频2'],
    phoneticUK: '[ˈwenzdeɪ]',
    phoneticUS: '[ˈwenzdeɪ]',
    partOfSpeech: 'n.',
    definition: '[C/U]星期三',
    example: 'We have English on Wednesday.',
    exampleCn: '我们星期三有英语课。',
    source: '人教七上U9',
    moreExamples: [
      'The meeting is scheduled for Wednesday afternoon.',
      'I go to the library every Wednesday.',
    ],
    phrases: [
      { phrase: 'on Wednesday', meaning: '在星期三' },
      { phrase: 'Wednesday morning', meaning: '星期三早上' },
      { phrase: 'Ash Wednesday', meaning: '圣灰星期三' },
    ],
    formationRules: [
      'Wednesday 源自古英语 Wōdnesdæg，意为"奥丁之日"。',
      '常见缩写：Wed. 或 Weds.',
      '首字母大写（星期名称均需大写）。',
    ],
    pronunciationRules: [
      'Wednesday 中第一个 d 不发音，拼写与发音不一致是常见易错点。',
      '实际发音为 /ˈwenzdeɪ/，类似"温兹day"。',
      '注意不要读成 /ˈwednezdeɪ/。',
    ],
  },
  delicious: {
    word: 'delicious',
    tags: ['课标词', '初中', '词频2'],
    phoneticUK: '[dɪˈlɪʃəs]',
    phoneticUS: '[dɪˈlɪʃəs]',
    partOfSpeech: 'adj.',
    definition: '美味的；可口的',
    example: 'The apples are delicious.',
    exampleCn: '这些苹果很好吃。',
    source: '人教七上U6',
    moreExamples: [
      'This cake tastes delicious.',
      'She cooked a delicious meal for us.',
    ],
    phrases: [
      { phrase: 'taste delicious', meaning: '尝起来很美味' },
      { phrase: 'look delicious', meaning: '看起来很美味' },
      { phrase: 'absolutely delicious', meaning: '绝对美味' },
    ],
    formationRules: [
      'delicious 源自拉丁语 delicere（吸引、诱惑）。',
      '词根 delic- 表示"快乐、愉悦"，-ious 为形容词后缀。',
      '同源词：delight（快乐）、delicate（精致的）。',
    ],
    pronunciationRules: [
      'delicious 重音在第二音节 li。',
      'cious 发 /ʃəs/，类似"舍斯"。',
      '常见易错：不要把 ci 读成 /si/，正确是 /ʃ/。',
    ],
  },
}

function getWordData(word: string): WordData {
  const key = word.toLowerCase()
  if (wordDatabase[key]) return wordDatabase[key]
  return {
    word,
    tags: ['词汇'],
    phoneticUK: `[/${word}/]`,
    phoneticUS: `[/${word}/]`,
    partOfSpeech: '—',
    definition: '暂无本地释义，可查看资源或生成讲解',
    example: `This is an example sentence with "${word}".`,
    exampleCn: `这是包含"${word}"的例句。`,
    source: '—',
    moreExamples: [],
    phrases: [],
    formationRules: [`${word} 的构词规律暂未收录，可在后续版本中查看。`],
    pronunciationRules: [`${word} 的发音规律暂未收录，可在后续版本中查看。`],
  }
}

export default function WordTeachingPage() {
  const { word: wordParam } = useParams<{ word: string }>()
  const navigate = useNavigate()
  const word = wordParam || 'apple'
  const data = useMemo(() => getWordData(word), [word])

  const [hideTranslation, setHideTranslation] = useState(false)
  const [activeTab, setActiveTab] = useState<'definition' | 'formation' | 'pronunciation'>('definition')
  const [fontSize, setFontSize] = useState(100)
  const [showMoreExamples, setShowMoreExamples] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const handlePlayAudio = (type: string) => {
    alert(`播放${type}发音：${word}`)
  }

  const handleSearch = () => {
    const q = searchInput.trim()
    if (q) {
      navigate(`/word-teaching/${encodeURIComponent(q.toLowerCase())}`)
      setSearchInput('')
    }
  }

  const handlePractice = () => {
    alert(`已打开「${word}」练一练面板（共 28 道练习），可加入练习篮或布置给学生。`)
  }

  const scaleStyle = { fontSize: `${fontSize}%` }

  return (
    <div className="fixed inset-0 z-[400] flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #1e4a2e 30%, #1a5a2a 60%, #1a3a2a 100%)' }}>
      {/* ── Main Content ── */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0 overflow-y-auto px-12 pt-8 pb-24" style={scaleStyle}>
          {/* Word Title + Tags */}
          <div className="flex items-start gap-4 mb-4">
            <h1 className="text-[64px] font-bold text-white leading-none">{data.word}</h1>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {data.tags.map((tag, i) => {
                const tagColors: Record<string, string> = {
                  '课标词': 'bg-orange-500/80 text-white',
                  '初中/高中': 'bg-cyan-500/80 text-white',
                  '初中': 'bg-cyan-500/80 text-white',
                  '词频4': 'bg-emerald-500/80 text-white',
                  '词频3': 'bg-emerald-500/80 text-white',
                  '词频2': 'bg-emerald-500/80 text-white',
                  '词汇': 'bg-slate-500/80 text-white',
                }
                return (
                  <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[tag] || 'bg-white/20 text-white'}`}>
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Pronunciation */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => handlePlayAudio('英式')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">英</span>
              <span className="text-lg font-medium">{data.phoneticUK}</span>
              <Volume2 size={16} className="text-emerald-300" />
            </button>
            <button
              onClick={() => handlePlayAudio('美式')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded">美</span>
              <span className="text-lg font-medium">{data.phoneticUS}</span>
              <Volume2 size={16} className="text-blue-300" />
            </button>
          </div>

          {/* ── Definition Tab Content ── */}
          {activeTab === 'definition' && (
            <div className="space-y-5">
              {/* Definition */}
              <div>
                <h2 className="text-2xl font-bold text-emerald-400 mb-3">· 释义</h2>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/30 text-emerald-300 text-sm font-bold shrink-0">{data.partOfSpeech}</span>
                    <p className="text-2xl text-white font-medium">
                      {hideTranslation ? <span className="bg-white/20 rounded px-6 py-1">  </span> : data.definition}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <Volume2 size={16} className="text-emerald-400 shrink-0 mt-1 cursor-pointer hover:text-emerald-300" onClick={() => handlePlayAudio('例句')} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xl text-white leading-relaxed">
                          {data.example.split(' ').map((w, i) => {
                            const clean = w.replace(/[.,;!?]/g, '').toLowerCase()
                            const isKey = clean === data.word.toLowerCase()
                            return (
                              <span key={i}>
                                {i > 0 && ' '}
                                <span className={isKey ? 'text-orange-400 font-semibold' : ''}>{w}</span>
                              </span>
                            )
                          })}
                        </p>
                        <p className="text-base text-white/60 mt-1">
                          {hideTranslation ? <span className="bg-white/20 rounded px-4 py-0.5">    </span> : data.exampleCn}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">（{data.source}）</p>
                      </div>
                    </div>

                    {/* More examples */}
                    {showMoreExamples && data.moreExamples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-3 ml-8">
                        <Volume2 size={14} className="text-emerald-400/60 shrink-0 mt-0.5 cursor-pointer hover:text-emerald-300" onClick={() => handlePlayAudio('例句')} />
                        <p className="text-lg text-white/80 leading-relaxed">{ex}</p>
                      </div>
                    ))}
                  </div>

                  {data.moreExamples.length > 0 && (
                    <button
                      onClick={() => setShowMoreExamples(!showMoreExamples)}
                      className="mt-3 flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                    >
                      {showMoreExamples ? '收起' : '展开'}
                      <ChevronDown size={14} className={`transition-transform ${showMoreExamples ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Related Phrases */}
              {data.phrases.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-emerald-400 mb-3">· 关联词组</h2>
                  <div className="space-y-2">
                    {data.phrases.map((p, i) => (
                      <div key={i} className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between hover:bg-white/15 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                          <Volume2 size={16} className="text-emerald-400 shrink-0 hover:text-emerald-300" onClick={(e) => { e.stopPropagation(); handlePlayAudio('短语') }} />
                          <div>
                            <p className="text-xl text-white font-medium">{p.phrase}</p>
                            <p className="text-sm text-white/60 mt-0.5">
                              {hideTranslation ? <span className="bg-white/20 rounded px-3 py-0.5">  </span> : p.meaning}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-white/30 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Formation Tab ── */}
          {activeTab === 'formation' && (
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-3">· 构词规律</h2>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
                {data.formationRules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-lg text-white/90 leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Pronunciation Tab ── */}
          {activeTab === 'pronunciation' && (
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-3">· 发音规律</h2>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
                {data.pronunciationRules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/30 text-blue-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-white/90 leading-relaxed">{rule}</p>
                      {rule.includes('/') && (
                        <Volume2 size={14} className="text-blue-400 shrink-0 cursor-pointer hover:text-blue-300" onClick={() => handlePlayAudio('音标')} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right Side: Hide Translation Toggle ── */}
        <div className="shrink-0 w-[260px] px-4 pt-8 flex flex-col items-end gap-4">
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <p className="text-xs text-white/70 mb-2">点击此处中文翻译将进行遮盖哟～</p>
            <button
              onClick={() => setHideTranslation(!hideTranslation)}
              className={`flex items-center gap-2 mx-auto px-4 py-2 rounded-lg transition-colors ${
                hideTranslation ? 'bg-emerald-500/40 text-emerald-200' : 'bg-white/10 text-white/60'
              }`}
            >
              {hideTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
              <span className="text-sm font-medium whitespace-nowrap">隐藏翻译</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Toolbar ── */}
      <div className="shrink-0 bg-black/40 backdrop-blur border-t border-white/10 px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Close */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Font Size */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(Math.max(60, fontSize - 10))}
              className="px-2 py-1 rounded text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors"
            >
              字号 -
            </button>
            <span className="text-white/60 text-xs min-w-[40px] text-center">{fontSize}%</span>
            <button
              onClick={() => setFontSize(Math.min(150, fontSize + 10))}
              className="px-2 py-1 rounded text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors"
            >
              字号 +
            </button>
          </div>

          {/* Tab Switchers */}
          <div className="flex items-center gap-1 ml-2">
            {[
              { key: 'definition' as const, label: '释义例句' },
              { key: 'formation' as const, label: '构词规律' },
              { key: 'pronunciation' as const, label: '发音规律' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-emerald-500/40 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Practice */}
          <button
            onClick={handlePractice}
            className="px-4 py-1.5 rounded-lg bg-emerald-500/60 text-white text-sm font-medium hover:bg-emerald-500/80 transition-colors whitespace-nowrap ml-2"
          >
            练一练(28)
          </button>

          {/* Search */}
          <div className="flex items-center gap-1 ml-auto px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
            <Search size={13} className="text-white/40" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="请输入搜索的单词"
              className="w-[160px] bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>

          {/* Close again */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Right Floating: My Prep ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => navigate('/resources')}
          className="flex flex-col items-center gap-0.5 px-2 py-3 bg-emerald-600/60 text-white text-[10px] rounded-lg hover:bg-emerald-600/80 transition-colors shadow-md"
        >
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white/10 border border-white/10 rounded-full text-white/40 hover:text-white/60 shadow-sm transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}
