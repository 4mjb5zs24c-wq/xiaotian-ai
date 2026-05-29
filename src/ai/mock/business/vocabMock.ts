/**
 * 词汇默写 Mock 数据
 * 数据特征：word, chinese, difficulty, errorRate, sourceUnit
 * 与阅读理解、听力等数据明确区分
 */

export interface VocabMockItem {
  word: string
  chinese: string
  difficulty: 'basic' | 'medium' | 'hard'
  errorRate: number
  sourceUnit: string
  commonMistake: string
}

export function getVocabMockData(unit = 'Unit 3'): VocabMockItem[] {
  const allWords: Record<string, VocabMockItem[]> = {
    'Unit 3': [
      { word: 'restaurant', chinese: '餐厅', difficulty: 'medium', errorRate: 48, sourceUnit: 'Unit 3', commonMistake: 'resturant' },
      { word: 'delicious', chinese: '美味的', difficulty: 'hard', errorRate: 42, sourceUnit: 'Unit 3', commonMistake: 'delicous' },
      { word: 'Wednesday', chinese: '星期三', difficulty: 'hard', errorRate: 55, sourceUnit: 'Unit 3', commonMistake: 'Wendesday' },
      { word: 'vegetable', chinese: '蔬菜', difficulty: 'medium', errorRate: 38, sourceUnit: 'Unit 3', commonMistake: 'vegtable' },
      { word: 'banana', chinese: '香蕉', difficulty: 'basic', errorRate: 20, sourceUnit: 'Unit 3', commonMistake: 'bananna' },
      { word: 'sandwich', chinese: '三明治', difficulty: 'hard', errorRate: 35, sourceUnit: 'Unit 3', commonMistake: 'sandwitch' },
      { word: 'breakfast', chinese: '早餐', difficulty: 'medium', errorRate: 28, sourceUnit: 'Unit 3', commonMistake: 'breakfest' },
      { word: 'because', chinese: '因为', difficulty: 'medium', errorRate: 40, sourceUnit: 'Unit 3', commonMistake: 'becuase' },
      { word: 'favorite', chinese: '最喜欢的', difficulty: 'hard', errorRate: 45, sourceUnit: 'Unit 3', commonMistake: 'favourit' },
      { word: 'important', chinese: '重要的', difficulty: 'hard', errorRate: 32, sourceUnit: 'Unit 3', commonMistake: 'importent' },
      { word: 'different', chinese: '不同的', difficulty: 'hard', errorRate: 30, sourceUnit: 'Unit 3', commonMistake: 'diffrent' },
      { word: 'healthy', chinese: '健康的', difficulty: 'medium', errorRate: 22, sourceUnit: 'Unit 3', commonMistake: 'helthy' },
      { word: 'exercise', chinese: '锻炼', difficulty: 'hard', errorRate: 36, sourceUnit: 'Unit 3', commonMistake: 'excercise' },
      { word: 'chicken', chinese: '鸡肉', difficulty: 'basic', errorRate: 15, sourceUnit: 'Unit 3', commonMistake: 'chiken' },
      { word: 'tomorrow', chinese: '明天', difficulty: 'medium', errorRate: 33, sourceUnit: 'Unit 3', commonMistake: 'tommorow' },
    ],
  }
  return allWords[unit] || allWords['Unit 3'] || []
}

export function getTopErrorWords(unit = 'Unit 3', count = 10): VocabMockItem[] {
  return getVocabMockData(unit)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, count)
}
