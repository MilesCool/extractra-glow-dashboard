
export type ExtractionStage = 'pending' | 'in-progress' | 'completed'

export interface StageInfo {
  name: string
  description: string
  status: ExtractionStage
  icon: React.ComponentType<any>
  progress?: number
  details?: string
  discoveredPages?: number
}

export interface ExtractionDashboardProps {
  url: string
  onBack: () => void
}
