
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Search, FileText, Loader2 } from 'lucide-react'
import { StageInfo } from '@/types/extraction'

interface ProgressCardProps {
  extractionStarted: boolean
  overallProgress: number
  stageStatuses: StageInfo[]
  currentStage: number
}

export function ProgressCard({ 
  extractionStarted, 
  overallProgress, 
  stageStatuses, 
  currentStage 
}: ProgressCardProps) {
  if (!extractionStarted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Extraction Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Stage Progress */}
        <div className="space-y-4">
          {stageStatuses.map((stage, index) => {
            const Icon = stage.icon
            const isActive = index === currentStage && stage.status === 'in-progress'
            
            return (
              <div 
                key={stage.name}
                className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                }`}
              >
                <div className={`mt-1 p-2 rounded-full transition-all duration-300 ${
                  stage.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : stage.status === 'in-progress'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stage.status === 'in-progress' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{stage.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stage.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : stage.status === 'in-progress'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {stage.status === 'completed' ? 'Completed' : 
                       stage.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {stage.description}
                  </p>
                  
                  {/* Stage specific details */}
                  {stage.details && (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {stage.details}
                      </p>
                      {/* Show loading icon for Page Discovery when discovering pages */}
                      {stage.name === 'Page Discovery' && 
                       stage.status === 'in-progress' && 
                       stage.details === 'Discovering pages...' && (
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  )}
                  
                  {/* Only show progress bar for Content Extraction and Result Integration */}
                  {stage.status === 'in-progress' && stage.name !== 'Page Discovery' && (
                    <div className="mt-2">
                      <Progress value={stage.progress || 0} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
