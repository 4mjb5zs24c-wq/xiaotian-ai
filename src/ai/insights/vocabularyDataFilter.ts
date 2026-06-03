/**
 * 词汇洞察 — 数据清洗
 *
 * 剔除低价值词类（代词、介词、冠词等），但语块整体保留。
 */

import type { WeakWordItem } from './vocabularyInsightTypes'

/** Known low-value English words for quick matching before detailed classification */
const LOW_VALUE_WORD_SET = new Set([
  // pronouns 代词
  'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves',
  'this', 'that', 'these', 'those',
  'who', 'whom', 'whose', 'which', 'what',
  'someone', 'anyone', 'everyone', 'no one', 'somebody', 'anybody', 'everybody', 'nobody',
  'something', 'anything', 'everything', 'nothing',
  // prepositions 介词
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from', 'by', 'about',
  'into', 'onto', 'upon', 'within', 'without', 'through', 'during', 'before', 'after',
  'above', 'below', 'between', 'among', 'behind', 'beside', 'near', 'under', 'over',
  'across', 'along', 'around',
  // articles 冠词
  'a', 'an', 'the',
  // numerals 数词
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'first', 'second', 'third', 'fourth', 'fifth',
  // interjections 叹词
  'oh', 'ah', 'wow', 'hey', 'hi', 'ouch', 'oops', 'hmm', 'um',
  // abbreviations
  'mr', 'mrs', 'ms', 'dr', 'am', 'pm', 'ok', 'tv', 'cd', 'dvd', 'usa', 'uk', 'un',
  // affixes
  'un', 're', 'ing', 'ed', 'ly', 'er', 'est', 'tion', 'sion', 'ness',
  // individual letters
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
])

/** Check if a single word is a low-value word type that should be filtered out */
function isLowValueWord(word: string): boolean {
  return LOW_VALUE_WORD_SET.has(word.toLowerCase().trim())
}

/**
 * Filter vocabulary items for insight display.
 * - Words (itemType === 'word'): filter out low-value types
 * - Chunks (itemType === 'chunk'): keep ALL — don't filter even if they contain prepositions/pronouns/articles
 */
export function filterVocabularyItems(items: WeakWordItem[]): WeakWordItem[] {
  return items.filter((item) => {
    // Always keep chunks/phrases
    if (item.itemType === 'chunk') return true
    // For words: filter out low-value ones
    return !isLowValueWord(item.text)
  })
}

/**
 * Get the count of filtered-out items (for reporting/transparency)
 */
export function getFilteredItemCount(items: WeakWordItem[]): number {
  return items.length - filterVocabularyItems(items).length
}
