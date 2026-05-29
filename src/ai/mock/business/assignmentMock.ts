/**
 * 布置作业 Mock 数据
 * 数据特征：classList, startTime, endTime, publishMode, scoreRule
 */

export interface ClassOption {
  id: string
  name: string
  studentCount: number
  grade: string
}

export interface AssignmentConfig {
  classList: ClassOption[]
  defaultStartTime: string
  defaultEndTime: string
  publishMode: 'immediate' | 'scheduled'
  scoreRule: 'show_after_due' | 'show_immediately' | 'never_show'
}

export function getClassList(): ClassOption[] {
  return [
    { id: 'c1', name: '七年级(3)班', studentCount: 42, grade: '七年级上' },
    { id: 'c2', name: '七年级(4)班', studentCount: 40, grade: '七年级上' },
    { id: 'c3', name: '八年级(1)班', studentCount: 38, grade: '八年级上' },
    { id: 'c4', name: '八年级(2)班', studentCount: 45, grade: '八年级上' },
  ]
}

export function getDefaultAssignmentConfig(): AssignmentConfig {
  return {
    classList: getClassList(),
    defaultStartTime: '立即开始',
    defaultEndTime: '次日 20:00',
    publishMode: 'immediate',
    scoreRule: 'show_after_due',
  }
}

// ── Published assignments (mock storage) ─────────────

interface PublishedAssignment {
  id: string
  title: string
  className: string
  content: string
  status: 'published'
  publishedAt: number
  dueDate: string
  scoreRule: string
}

const publishedList: PublishedAssignment[] = []

export function publishAssignment(params: {
  title: string
  className: string
  content: string
  dueDate: string
  scoreRule: string
}): PublishedAssignment {
  const asgn: PublishedAssignment = {
    id: `asgn-${Date.now()}`,
    title: params.title,
    className: params.className,
    content: params.content,
    status: 'published',
    publishedAt: Date.now(),
    dueDate: params.dueDate,
    scoreRule: params.scoreRule,
  }
  publishedList.push(asgn)
  return asgn
}

export function getPublishedAssignments(): PublishedAssignment[] {
  return publishedList
}
