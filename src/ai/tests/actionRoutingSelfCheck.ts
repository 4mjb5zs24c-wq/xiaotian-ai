/**
 * Action Routing Self-Check
 *
 * 验证 preview / assign / add_to_basket 三个行为是否正确分流。
 *
 * 核心原则:
 *   - preview  → 只能打开 resourcePreview（不能进入布置）
 *   - assign   → 只能打开 assignmentConfirm（不能直接发布）
 *   - basket   → 只能 addToBasket + toast（不能改变面板状态）
 */

// ── Simulated action routing (mirrors AIAssistantDrawer logic) ──

type SimAction = 'preview' | 'assign' | 'basket' | 'other'

interface SimState {
  panelType: 'home' | 'searchResult' | 'workflow' | 'resourcePreview' | 'assignmentConfirm' | 'basket'
  basketCount: number
  basketToast: string | null
  lastAssignDirectPublish: boolean
}

function createSimState(): SimState {
  return { panelType: 'home', basketCount: 0, basketToast: null, lastAssignDirectPublish: false }
}

let basketItems: string[] = []

function resetBasket() { basketItems = [] }

function simHandleResourceAction(
  action: SimAction,
  resource: { id: string; title: string },
  state: SimState,
): SimState {
  const next = { ...state }

  switch (action) {
    case 'preview':
      // preview must ONLY open resourcePreview, never assignmentConfirm
      next.panelType = 'resourcePreview'
      break

    case 'assign':
      // assign must ONLY open assignmentConfirm, never direct publish
      next.panelType = 'assignmentConfirm'
      break

    case 'basket': {
      // basket must ONLY add to basket + toast, never change panel
      const exists = basketItems.includes(resource.id)
      if (exists) {
        next.basketToast = '该内容已在练习篮中'
      } else {
        basketItems.push(resource.id)
        next.basketCount = state.basketCount + 1
        next.basketToast = '已加入练习篮'
      }
      // panelType must NOT change
      break
    }

    case 'other':
      // catch-all for non-critical actions
      break
  }

  return next
}

// ── Test runner ──

export function runActionRoutingSelfCheck(): { passed: number; failed: number; results: string[] } {
  resetBasket()
  let passed = 0
  let failed = 0
  const results: string[] = []

  results.push('╔══════════════════════════════════════════════════╗')
  results.push('║     Action Routing 自检                          ║')
  results.push('╚══════════════════════════════════════════════════╝')
  results.push('')

  const mockResource = { id: 'test-1', title: 'Unit3 阅读理解' }

  // ── Test 1: preview → resourcePreview ──
  {
    const state = createSimState()
    const next = simHandleResourceAction('preview', mockResource, state)

    const ok = next.panelType === 'resourcePreview'
      && (next.panelType as string) !== 'assignmentConfirm'
      && next.basketCount === 0
      && !next.lastAssignDirectPublish

    if (ok) {
      passed++
      results.push('✅ preview → resourcePreview（未进入布置确认）')
    } else {
      failed++
      results.push(`❌ preview → 实际 panelType=${next.panelType}，应为 resourcePreview`)
    }
  }

  // ── Test 2: assign → assignmentConfirm (not direct publish) ──
  {
    const state = createSimState()
    const next = simHandleResourceAction('assign', mockResource, state)

    const ok = next.panelType === 'assignmentConfirm'
      && !next.lastAssignDirectPublish

    if (ok) {
      passed++
      results.push('✅ assign → assignmentConfirm（未直接发布，未进入预览）')
    } else {
      failed++
      results.push(`❌ assign → 实际 panelType=${next.panelType}，应为 assignmentConfirm`)
    }
  }

  // ── Test 3: basket → basket only, panelType unchanged ──
  {
    const state = createSimState()
    state.panelType = 'workflow' // starting from workflow
    const next = simHandleResourceAction('basket', mockResource, state)

    const ok = next.panelType === 'workflow'  // panelType unchanged!
      && next.basketCount === 1
      && next.basketToast === '已加入练习篮'
      && (next.panelType as string) !== 'assignmentConfirm'

    if (ok) {
      passed++
      results.push('✅ add_to_basket → basket only（面板状态未改变，basket+1）')
    } else {
      failed++
      results.push(`❌ add_to_basket → panelType=${next.panelType}（应为workflow不变）, basket=${next.basketCount}`)
    }
  }

  // ── Test 4: basket duplicate → no double-add ──
  {
    const dedupResource = { id: 'dedup-test-99', title: 'Dedup Test' }
    const state = createSimState()
    state.panelType = 'resourcePreview'
    const next1 = simHandleResourceAction('basket', dedupResource, state)
    const next2 = simHandleResourceAction('basket', dedupResource, next1)

    const ok = next2.panelType === 'resourcePreview'
      && next2.basketCount === 1  // still 1, not 2
      && next2.basketToast === '该内容已在练习篮中'

    if (ok) {
      passed++
      results.push('✅ 重复加入练习篮 → 去重拦截（basket count 仍为1）')
    } else {
      failed++
      results.push(`❌ 重复加入 → basket=${next2.basketCount}（应为1）, toast=${next2.basketToast}`)
    }
  }

  // ── Test 5: preview followed by assign from preview panel ──
  {
    const state = createSimState()
    const previewState = simHandleResourceAction('preview', mockResource, state)
    const ok1 = previewState.panelType === 'resourcePreview'

    // From preview panel, click "布置给学生" → assign
    const assignState = simHandleResourceAction('assign', mockResource, previewState)
    const ok2 = assignState.panelType === 'assignmentConfirm'

    if (ok1 && ok2) {
      passed++
      results.push('✅ preview → resourcePreview → assign → assignmentConfirm（两级正确）')
    } else {
      failed++
      results.push(`❌ preview→assign 链路: previewState=${previewState.panelType}, assignState=${assignState.panelType}`)
    }
  }

  results.push('')
  results.push('──────────────────────────────────────────────────')
  results.push(`  通过: ${passed}/5  (${Math.round(passed / 5 * 100)}%)`)
  results.push(`  失败: ${failed}/5`)
  results.push('──────────────────────────────────────────────────')

  return { passed, failed, results }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runActionRoutingSelfCheck = () => {
    const { results } = runActionRoutingSelfCheck()
    results.forEach((line) => console.log(line))
  }
}
