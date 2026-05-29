/**
 * 阅读理解 Mock 数据
 * 数据特征：title, passage, questionCount, questionTypes, difficulty, estimatedTime
 * 与词汇默写数据结构完全不同
 */

export interface ReadingMockItem {
  id: string
  title: string
  passage: string
  questionCount: number
  questionTypes: string[]
  difficulty: 'basic' | 'medium' | 'advanced'
  estimatedTime: string
  unit: string
  grade: string
  tags: string[]
}

export function getReadingMockData(_unit?: string): ReadingMockItem[] {
  return [
    {
      id: 'read-1',
      title: 'Food Around the World',
      passage: 'People around the world eat different kinds of food. In China, rice and noodles are very common. In Italy, people love pasta and pizza. In Japan, sushi is a traditional food. In Mexico, people enjoy tacos with beans and meat. Food tells us a lot about a country and its culture. When we travel, trying local food is one of the best ways to understand a place.',
      questionCount: 5,
      questionTypes: ['主旨大意', '细节理解', '词义猜测', '推理判断'],
      difficulty: 'medium',
      estimatedTime: '10分钟',
      unit: 'Unit 3',
      grade: '八年级上',
      tags: ['阅读', '食物', '文化', 'Unit 3'],
    },
    {
      id: 'read-2',
      title: 'My School Day',
      passage: 'I usually get up at 6:30 in the morning. After washing my face and brushing my teeth, I have breakfast at 7:00. My mother always makes delicious sandwiches for me. I go to school by bus. The bus ride takes about 20 minutes. School starts at 8:00. We have four classes in the morning. My favorite subject is English because our teacher makes it fun and interesting.',
      questionCount: 5,
      questionTypes: ['细节理解', '推理判断', '主旨大意'],
      difficulty: 'basic',
      estimatedTime: '8分钟',
      unit: 'Unit 3',
      grade: '八年级上',
      tags: ['阅读', '学校', '日常', 'Unit 3'],
    },
    {
      id: 'read-3',
      title: 'How to Stay Healthy',
      passage: 'To stay healthy, you need to do three things. First, eat the right food. You should eat more vegetables and fruits and less junk food. Second, exercise every day. You don\'t need to run for hours. Just 30 minutes of walking is enough. Third, get enough sleep. Teenagers need about 8 to 10 hours of sleep every night. Remember, a healthy body makes a healthy mind.',
      questionCount: 5,
      questionTypes: ['主旨大意', '细节理解', '词义猜测', '推理判断', '作者观点'],
      difficulty: 'medium',
      estimatedTime: '10分钟',
      unit: 'Unit 3',
      grade: '八年级上',
      tags: ['阅读', '健康', 'Unit 3'],
    },
    {
      id: 'read-4',
      title: 'The Story of the Hamburger',
      passage: 'The hamburger is one of the most popular foods in the world. But do you know where it came from? The name "hamburger" comes from Hamburg, a city in Germany. In the 19th century, German immigrants brought their "Hamburg steak" to America. Later, someone put the meat between two pieces of bread, and the modern hamburger was born. Today, people eat billions of hamburgers every year.',
      questionCount: 5,
      questionTypes: ['细节理解', '推理判断', '主旨大意', '词义猜测'],
      difficulty: 'advanced',
      estimatedTime: '12分钟',
      unit: 'Unit 3',
      grade: '八年级上',
      tags: ['阅读', '食物', '文化', 'Unit 3', '进阶'],
    },
    {
      id: 'read-5',
      title: 'Protecting Our Environment',
      passage: 'Our environment is facing many problems. Air pollution makes it hard to breathe in big cities. Water pollution kills fish and makes rivers dirty. Too much rubbish is filling up our land. But everyone can help. We can use less plastic, recycle more, and plant trees. Small actions can make a big difference. Let\'s start today to protect our planet for tomorrow.',
      questionCount: 5,
      questionTypes: ['主旨大意', '细节理解', '推理判断', '作者观点'],
      difficulty: 'medium',
      estimatedTime: '10分钟',
      unit: '拓展',
      grade: '通用',
      tags: ['阅读', '环保', '时文'],
    },
  ]
}
