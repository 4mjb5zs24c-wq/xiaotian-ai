/**
 * Practice Basket — 练习篮
 *
 * 老师从 AI 推荐中选择资源加入练习篮，
 * 最终一次性生成作业或制卡。
 */

import type { BusinessResource, PracticeBasketItem, PracticeBasket, Assignment } from './types'

// ── State ──────────────────────────────────────────────

const basketItems: PracticeBasketItem[] = []

// ── Basket Operations ──────────────────────────────────

export function addToBasket(resource: BusinessResource, overrides?: PracticeBasketItem['overrides']): PracticeBasketItem {
  const item: PracticeBasketItem = {
    id: `basket-${Date.now()}`,
    resource,
    addedAt: Date.now(),
    overrides: overrides || {},
    aiNote: resource.aiReason.short,
  }
  basketItems.push(item)
  return item
}

export function removeFromBasket(itemId: string): boolean {
  const idx = basketItems.findIndex(i => i.id === itemId)
  if (idx < 0) return false
  basketItems.splice(idx, 1)
  return true
}

export function updateBasketItem(itemId: string, overrides: PracticeBasketItem['overrides']): boolean {
  const item = basketItems.find(i => i.id === itemId)
  if (!item) return false
  item.overrides = { ...item.overrides, ...overrides }
  return true
}

export function getBasket(): PracticeBasket {
  const totalScore = basketItems.reduce((s, i) => s + (i.overrides.score || 100), 0)
  return {
    items: basketItems,
    totalScore,
    totalItems: basketItems.length,
    estimatedTime: basketItems.length > 0
      ? `约${basketItems.reduce((s, i) => s + parseInt(i.resource.duration) || 10, 0)}分钟`
      : '0分钟',
  }
}

export function clearBasket(): void {
  basketItems.length = 0
}

export function getBasketCount(): number {
  return basketItems.length
}

// ── Generate Assignment from Basket ────────────────────

export function generateAssignment(params: {
  title: string
  targetClass: string
  dueDate?: string
}): Assignment {
  const basket = getBasket()
  const assignment: Assignment = {
    id: `assignment-${Date.now()}`,
    title: params.title,
    type: 'homework',
    resources: basket.items.map(i => i.resource),
    targetClass: params.targetClass,
    dueDate: params.dueDate,
    totalScore: basket.totalScore,
    estimatedTime: basket.estimatedTime,
    status: 'draft',
    aiGeneratedNote: `AI 基于${basket.totalItems}个资源生成。覆盖：${basket.items.map(i => i.resource.type).join('、')}。`,
  }
  return assignment
}
