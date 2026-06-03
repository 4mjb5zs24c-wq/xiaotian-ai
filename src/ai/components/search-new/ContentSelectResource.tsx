import React, { useState, useCallback } from 'react'
import { Send, Info } from 'lucide-react'
import type { ResourceItem, SyncVocabData, SyncTextData, VocabUsageId, TextUsageId, AssignmentDraft, TextTreeNode } from '../../search-new/types'
import SyncVocabSection from './SyncVocabSection'
import SyncTextSection from './SyncTextSection'
import UsageSelector from './UsageSelector'

interface ContentSelectResourceProps {
  item: ResourceItem
  onGenerateAssignments: (assignments: AssignmentDraft[]) => void
}

/**
 * Generates assignment drafts for sync vocab by collecting selected content
 * and pairing with selected usages.
 */
function generateVocabAssignments(
  item: ResourceItem,
  selectedIds: Set<string>,
  selectedUsages: string[],
  usageLabels: Record<string, string>,
): AssignmentDraft[] {
  const assignments: AssignmentDraft[] = []
  let idx = 0

  for (const usageId of selectedUsages) {
    idx++
    assignments.push({
      id: `draft-${item.id}-${usageId}-${idx}`,
      title: `${item.title} — ${usageLabels[usageId] || usageId}`,
      usageType: usageId as VocabUsageId,
      usageLabel: usageLabels[usageId] || usageId,
      contentCount: selectedIds.size,
      contentIds: Array.from(selectedIds),
    })
  }

  return assignments
}

/**
 * Generates assignment drafts for sync text, grouped by leaf node.
 * Each leaf node's selected items × each usage = one assignment.
 */
function generateTextAssignments(
  tree: TextTreeNode[],
  selectedIds: Set<string>,
  selectedUsages: string[],
  usageLabels: Record<string, string>,
): AssignmentDraft[] {
  const assignments: AssignmentDraft[] = []

  // Find all leaf nodes and their selected items
  function collectLeafSelections(node: TextTreeNode, parentName: string): void {
    if (node.isLeafNode) {
      const selectedInNode = node.items.filter((i) => selectedIds.has(i.id))
      if (selectedInNode.length > 0) {
        for (const usageId of selectedUsages) {
          assignments.push({
            id: `draft-${node.nodeId}-${usageId}-${assignments.length}`,
            title: `${parentName} ${node.nodeName} — ${usageLabels[usageId] || usageId}`,
            nodeName: node.nodeName,
            usageType: usageId as TextUsageId,
            usageLabel: usageLabels[usageId] || usageId,
            contentCount: selectedInNode.length,
            contentIds: selectedInNode.map((i) => i.id),
          })
        }
      }
    } else {
      const newParent = parentName ? `${parentName} ${node.nodeName}` : node.nodeName
      node.children.forEach((c) => collectLeafSelections(c, newParent))
    }
  }

  tree.forEach((n) => collectLeafSelections(n, ''))

  return assignments
}

const VOCAB_USAGE_LABELS: Record<string, string> = {
  oral_reading: '口语跟读',
  en_to_cn_select: '看英选中',
  dictation_write: '单词默写',
  cn_to_en_select: '看中选英',
  listening_dictation: '单词听写',
  listen_recognize: '听音识词',
}

const TEXT_USAGE_LABELS: Record<string, string> = {
  sentence_reading: '逐句跟读',
  passage_reading: '整篇跟读',
  passage_recite: '整篇背诵',
}

const ContentSelectResource: React.FC<ContentSelectResourceProps> = ({ item, onGenerateAssignments }) => {
  const isVocab = item.type === 'sync_vocab'
  const vocabData = isVocab ? (item.contentData as SyncVocabData | undefined) : undefined
  const textData = !isVocab ? (item.contentData as SyncTextData | undefined) : undefined

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectedUsages, setSelectedUsages] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    if (vocabData) return new Set(vocabData.sections.map((s) => s.sectionId))
    return new Set()
  })
  const [showAllSections, setShowAllSections] = useState<Set<string>>(new Set())
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    if (textData) {
      const ids = new Set<string>()
      function collect(nodes: TextTreeNode[]) {
        nodes.forEach((n) => {
          ids.add(n.nodeId)
          if (!n.isLeafNode) collect(n.children)
        })
      }
      collect(textData.tree)
      return ids
    }
    return new Set()
  })
  const [showAllNodes, setShowAllNodes] = useState<Set<string>>(new Set())

  // Toggle word/item selection
  const toggleItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Toggle section expand
  const toggleSectionExpand = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Toggle section "show all"
  const toggleShowAll = useCallback((id: string) => {
    setShowAllSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Toggle section select all
  const toggleSectionAll = useCallback((_sectionId: string, itemIds: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const allSelected = itemIds.every((id) => next.has(id))
      if (allSelected) {
        itemIds.forEach((id) => next.delete(id))
      } else {
        itemIds.forEach((id) => next.add(id))
      }
      return next
    })
  }, [])

  // Toggle node expand (for text tree)
  const toggleNodeExpand = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Toggle node show all
  const toggleNodeShowAll = useCallback((id: string) => {
    setShowAllNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Toggle node select all
  const toggleNodeAll = useCallback((_nodeId: string, itemIds: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const allSelected = itemIds.every((id) => next.has(id))
      if (allSelected) {
        itemIds.forEach((id) => next.delete(id))
      } else {
        itemIds.forEach((id) => next.add(id))
      }
      return next
    })
  }, [])

  // Generate assignments
  const handleGenerate = () => {
    if (selectedIds.size === 0 || selectedUsages.length === 0) return

    let drafts: AssignmentDraft[] = []
    if (isVocab && vocabData) {
      drafts = generateVocabAssignments(item, selectedIds, selectedUsages, VOCAB_USAGE_LABELS)
    } else if (!isVocab && textData) {
      drafts = generateTextAssignments(textData.tree, selectedIds, selectedUsages, TEXT_USAGE_LABELS)
    }

    onGenerateAssignments(drafts)
  }

  const canGenerate = selectedIds.size > 0 && selectedUsages.length > 0

  // Compute the correct assignment count
  let computedAssignments = 0
  if (isVocab) {
    computedAssignments = selectedIds.size > 0 ? selectedUsages.length : 0
  } else if (textData) {
    // Count unique leaf nodes with selections
    const leafNodeIds = new Set<string>()
    function countLeafSelections(node: TextTreeNode): void {
      if (node.isLeafNode) {
        const selected = node.items.filter((i) => selectedIds.has(i.id))
        if (selected.length > 0) leafNodeIds.add(node.nodeId)
      } else {
        node.children.forEach(countLeafSelections)
      }
    }
    textData.tree.forEach(countLeafSelections)
    computedAssignments = leafNodeIds.size * selectedUsages.length
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
      {/* Resource Title */}
      <h4 className="text-[15px] font-semibold text-slate-800">{item.title}</h4>

      {/* Content Selection Area */}
      {isVocab && vocabData && (
        <SyncVocabSection
          data={vocabData}
          selectedIds={selectedIds}
          expandedSections={expandedSections}
          showAllSections={showAllSections}
          onToggleWord={toggleItem}
          onToggleSectionAll={toggleSectionAll}
          onToggleSectionExpand={toggleSectionExpand}
          onToggleShowAll={toggleShowAll}
        />
      )}

      {!isVocab && textData && (
        <SyncTextSection
          tree={textData.tree}
          selectedIds={selectedIds}
          expandedNodes={expandedNodes}
          showAllNodes={showAllNodes}
          onToggleItem={toggleItem}
          onToggleNodeAll={toggleNodeAll}
          onToggleNodeExpand={toggleNodeExpand}
          onToggleShowAll={toggleNodeShowAll}
        />
      )}

      {/* Usage Selection */}
      <UsageSelector
        type={isVocab ? 'vocab' : 'text'}
        selected={selectedUsages}
        onChange={setSelectedUsages}
      />

      {/* Generate Button + Status */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="text-[13px] text-slate-500">
          {selectedIds.size === 0 && selectedUsages.length === 0 && (
            <span className="flex items-center gap-1.5">
              <Info size={13} />
              请选择至少 1 个内容和 1 种练习形式
            </span>
          )}
          {selectedIds.size === 0 && selectedUsages.length > 0 && (
            <span className="flex items-center gap-1.5 text-amber-600">
              <Info size={13} />
              请选择至少 1 个内容
            </span>
          )}
          {selectedIds.size > 0 && selectedUsages.length === 0 && (
            <span className="flex items-center gap-1.5 text-amber-600">
              <Info size={13} />
              请选择至少 1 种练习形式
            </span>
          )}
          {selectedIds.size > 0 && selectedUsages.length > 0 && (
            <span>
              已选择 <strong className="text-blue-500">{selectedIds.size}</strong> 个内容，
              <strong className="text-blue-500">{selectedUsages.length}</strong> 种练习形式，
              将生成 <strong className="text-blue-500">{computedAssignments}</strong> 条独立作业
            </span>
          )}
        </div>
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200
            ${canGenerate
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          <Send size={13} />
          生成练习
        </button>
      </div>
    </div>
  )
}

export default ContentSelectResource
