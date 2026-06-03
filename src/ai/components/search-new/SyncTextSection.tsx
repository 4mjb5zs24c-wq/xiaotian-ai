import React from 'react'
import { ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react'
import type { TextTreeNode } from '../../search-new/types'

interface SyncTextSectionProps {
  tree: TextTreeNode[]
  selectedIds: Set<string>
  expandedNodes: Set<string>
  showAllNodes: Set<string>
  onToggleItem: (itemId: string) => void
  onToggleNodeAll: (nodeId: string, itemIds: string[]) => void
  onToggleNodeExpand: (nodeId: string) => void
  onToggleShowAll: (nodeId: string) => void
}

interface TreeNodeRowProps {
  node: TextTreeNode
  depth: number
  selectedIds: Set<string>
  expandedNodes: Set<string>
  showAllNodes: Set<string>
  onToggleItem: (itemId: string) => void
  onToggleNodeAll: (nodeId: string, itemIds: string[]) => void
  onToggleNodeExpand: (nodeId: string) => void
  onToggleShowAll: (nodeId: string) => void
}

/** Collect all item IDs under a node (including nested leaf nodes) */
function collectItemIds(node: TextTreeNode): string[] {
  if (node.isLeafNode) {
    return node.items.map((i) => i.id)
  }
  return node.children.flatMap(collectItemIds)
}

const TreeNodeRow: React.FC<TreeNodeRowProps> = ({
  node,
  depth,
  selectedIds,
  expandedNodes,
  showAllNodes,
  onToggleItem,
  onToggleNodeAll,
  onToggleNodeExpand,
  onToggleShowAll,
}) => {
  const isExpanded = expandedNodes.has(node.nodeId)
  const showAll = showAllNodes.has(node.nodeId)

  if (node.isLeafNode) {
    // Leaf node — show items directly
    const visibleItems = showAll ? node.items : node.items.slice(0, node.defaultLimit)
    const hasMore = node.items.length > node.defaultLimit
    const nodeItemIds = node.items.map((i) => i.id)
    const selectedInNode = node.items.filter((i) => selectedIds.has(i.id))
    const allSelected = node.items.length > 0 && selectedInNode.length === node.items.length

    return (
      <div className="border-l-2 border-slate-200 ml-2" style={{ marginLeft: `${depth * 16 + 8}px` }}>
        {/* Leaf Node Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#fafbfc] border-b border-[#eef3f8]">
          <div className="flex items-center gap-1.5">
            <button onClick={() => onToggleNodeExpand(node.nodeId)}>
              {isExpanded ? (
                <ChevronDown size={17} className="text-[#6b8aaa]" />
              ) : (
                <ChevronRight size={17} className="text-[#6b8aaa]" />
              )}
            </button>
            <span className="text-[16px] font-medium text-[#3a4f66]">{node.nodeName}</span>
            <span className="text-[16px] text-[#9ab3cc]">({node.items.length}条)</span>
            {selectedInNode.length > 0 && (
              <span className="text-[16px] text-[#4b9fe8] font-medium">
                已选 {selectedInNode.length}
              </span>
            )}
          </div>
          {node.items.length > 0 && (
            <button
              onClick={() => onToggleNodeAll(node.nodeId, nodeItemIds)}
              className="flex items-center gap-3 text-[16px] text-[#4b9fe8] hover:text-[#3a8dd4] font-medium"
            >
              {allSelected ? (
                <CheckSquare size={17} />
              ) : (
                <Square size={17} className="text-[#bbb]" />
              )}
              {allSelected ? '取消全选' : '全选'}
            </button>
          )}
        </div>

        {/* Leaf Node Items */}
        {isExpanded && (
          <div className="p-2 space-y-3.5">
            {visibleItems.map((item) => {
              const isSelected = selectedIds.has(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => onToggleItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150
                    ${isSelected
                      ? 'bg-[#4b9fe8]/8 border border-[#4b9fe8]/20'
                      : 'bg-white border border-[#eef3f8] hover:border-[#d0dce8]'
                    }`}
                >
                  {isSelected ? (
                    <CheckSquare size={16} className="text-[#4b9fe8] flex-shrink-0" />
                  ) : (
                    <Square size={16} className="text-[#ccc] flex-shrink-0" />
                  )}
                  <span className="text-[16px] text-[#1a2e3f]">{item.title}</span>
                  {item.passageType && (
                    <span className="text-[16px] text-[#9ab3cc] ml-auto">{item.passageType}</span>
                  )}
                </button>
              )
            })}
            {hasMore && (
              <button
                onClick={() => onToggleShowAll(node.nodeId)}
                className="w-full py-1.5 text-center text-[17px] text-[#4b9fe8] hover:text-[#3a8dd4] font-medium"
              >
                {showAll ? '收起' : `展开全部 ${node.items.length} 条`}
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  // Branch node — show children
  const allChildIds = collectItemIds(node)
  const selectedInBranch = allChildIds.filter((id) => selectedIds.has(id))
  const allBranchSelected = allChildIds.length > 0 && selectedInBranch.length === allChildIds.length

  return (
    <div style={{ marginLeft: `${depth * 16}px` }}>
      {/* Branch Node Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#f0f6fc] border border-[#d0dce8] rounded-lg mb-1">
        <div className="flex items-center gap-1.5">
          <button onClick={() => onToggleNodeExpand(node.nodeId)}>
            {isExpanded ? (
              <ChevronDown size={16} className="text-[#4b9fe8]" />
            ) : (
              <ChevronRight size={16} className="text-[#4b9fe8]" />
            )}
          </button>
          <span className="text-[17px] font-semibold text-[#1a2e3f]">{node.nodeName}</span>
          {selectedInBranch.length > 0 && (
            <span className="text-[16px] text-[#4b9fe8] font-medium">
              已选 {selectedInBranch.length}/{allChildIds.length}
            </span>
          )}
        </div>
        {allChildIds.length > 0 && (
          <button
            onClick={() => onToggleNodeAll(node.nodeId, allChildIds)}
            className="flex items-center gap-3 text-[17px] text-[#4b9fe8] hover:text-[#3a8dd4] font-medium"
          >
            {allBranchSelected ? (
              <CheckSquare size={16} />
            ) : (
              <Square size={16} className="text-[#bbb]" />
            )}
            {allBranchSelected ? '取消全选' : '全选本节点'}
          </button>
        )}
      </div>

      {/* Children */}
      {isExpanded && (
        <div className="space-y-1">
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.nodeId}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedNodes={expandedNodes}
              showAllNodes={showAllNodes}
              onToggleItem={onToggleItem}
              onToggleNodeAll={onToggleNodeAll}
              onToggleNodeExpand={onToggleNodeExpand}
              onToggleShowAll={onToggleShowAll}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const SyncTextSection: React.FC<SyncTextSectionProps> = ({
  tree,
  selectedIds,
  expandedNodes,
  showAllNodes,
  onToggleItem,
  onToggleNodeAll,
  onToggleNodeExpand,
  onToggleShowAll,
}) => {
  return (
    <div className="space-y-2">
      {tree.map((node) => (
        <TreeNodeRow
          key={node.nodeId}
          node={node}
          depth={0}
          selectedIds={selectedIds}
          expandedNodes={expandedNodes}
          showAllNodes={showAllNodes}
          onToggleItem={onToggleItem}
          onToggleNodeAll={onToggleNodeAll}
          onToggleNodeExpand={onToggleNodeExpand}
          onToggleShowAll={onToggleShowAll}
        />
      ))}
    </div>
  )
}

export default SyncTextSection
