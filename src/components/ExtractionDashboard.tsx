
import { useState } from 'react'
import { Navigation } from './Navigation'
import { ExtractionHeader } from './ExtractionHeader'
import { RequirementsCard } from './RequirementsCard'
import { ProgressCard } from './ProgressCard'
import { ResultsCard } from './ResultsCard'
import { DataPreviewCard } from './DataPreviewCard'
import { CheckCircle, FileText, Search } from 'lucide-react'
import { ExtractionDashboardProps, StageInfo } from '@/types/extraction'

export function ExtractionDashboard({ url, onBack }: ExtractionDashboardProps) {
  const [requirements, setRequirements] = useState('')
  const [currentStage, setCurrentStage] = useState(0)
  const [extractionStarted, setExtractionStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)

  const [stageStatuses, setStageStatuses] = useState<StageInfo[]>([
    {
      name: 'Page Discovery',
      description: 'Discovering and mapping website structure',
      status: 'pending',
      icon: Search,
      progress: 0,
      details: 'Waiting to start...',
      discoveredPages: 0
    },
    {
      name: 'Content Extraction', 
      description: 'Extracting relevant data based on requirements',
      status: 'pending',
      icon: FileText,
      progress: 0,
      details: 'Waiting to start...'
    },
    {
      name: 'Result Integration',
      description: 'Processing and formatting extracted data',
      status: 'pending',
      icon: CheckCircle,
      progress: 0,
      details: 'Waiting to start...'
    }
  ])

  const startExtraction = () => {
    if (!requirements.trim()) return
    
    setExtractionStarted(true)
    simulateExtraction()
  }

  const simulateExtraction = () => {
    let stage = 0
    
    const updateStage = () => {
      // Update stage statuses
      setStageStatuses(prev => prev.map((s, index) => {
        if (index < stage) {
          return { ...s, status: 'completed', progress: 100 }
        } else if (index === stage) {
          return { ...s, status: 'in-progress' }
        } else {
          return { ...s, status: 'pending', progress: 0 }
        }
      }))
      
      setCurrentStage(stage)
      
      // Simulate progress for current stage
      if (stage === 0) {
        // Page Discovery stage - only show loading, then result
        setStageStatuses(prev => prev.map((s, index) => 
          index === stage ? {
            ...s,
            details: 'Discovering pages...'
          } : s
        ))
        
        // Simulate discovery completion after 3 seconds
        setTimeout(() => {
          const discoveredCount = 15
          setStageStatuses(prev => prev.map((s, index) => 
            index === stage ? {
              ...s,
              status: 'completed',
              progress: 100,
              details: `Discovered ${discoveredCount} pages`,
              discoveredPages: discoveredCount
            } : s
          ))
          
          setTimeout(() => {
            stage++
            if (stage < 3) updateStage()
          }, 500)
        }, 3000)
        
      } else if (stage === 1) {
        // Content Extraction stage
        let extractedPages = 0
        const totalPages = 15
        const extractionInterval = setInterval(() => {
          extractedPages += 1
          if (extractedPages > totalPages) extractedPages = totalPages
          
          const progress = (extractedPages / totalPages) * 100
          setStageStatuses(prev => prev.map((s, index) => 
            index === stage ? {
              ...s,
              progress,
              details: `Extracted ${extractedPages}/${totalPages} pages`
            } : s
          ))
          
          if (extractedPages >= totalPages) {
            clearInterval(extractionInterval)
            setTimeout(() => {
              stage++
              if (stage < 3) updateStage()
            }, 500)
          }
        }, 200)
      } else if (stage === 2) {
        // Result Integration stage
        let integrationProgress = 0
        const integrationSteps = ['Processing data...', 'Formatting results...', 'Generating file...', 'Finalizing...']
        let currentStep = 0
        
        const integrationInterval = setInterval(() => {
          integrationProgress += 25
          
          setStageStatuses(prev => prev.map((s, index) => 
            index === stage ? {
              ...s,
              progress: integrationProgress,
              details: integrationSteps[currentStep] || 'Completing...'
            } : s
          ))
          
          currentStep++
          
          if (integrationProgress >= 100) {
            clearInterval(integrationInterval)
            setTimeout(() => {
              setStageStatuses(prev => prev.map(s => ({ ...s, status: 'completed', progress: 100 })))
              setIsCompleted(true)
              setOverallProgress(100)
            }, 500)
          }
        }, 800)
      }
      
      setOverallProgress(((stage + 1) / 3) * 100)
    }
    
    setTimeout(updateStage, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <ExtractionHeader url={url} onBack={onBack} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Requirements & Progress */}
          <div className="space-y-6">
            <RequirementsCard
              requirements={requirements}
              setRequirements={setRequirements}
              extractionStarted={extractionStarted}
              onStartExtraction={startExtraction}
            />

            <ProgressCard
              extractionStarted={extractionStarted}
              overallProgress={overallProgress}
              stageStatuses={stageStatuses}
              currentStage={currentStage}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <ResultsCard isCompleted={isCompleted} />
            <DataPreviewCard isCompleted={isCompleted} />
          </div>
        </div>
      </main>
    </div>
  )
}
