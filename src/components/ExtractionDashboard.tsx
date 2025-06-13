
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from './Navigation'
import { CheckCircle, Clock, FileText, Search, Download, ArrowLeft, Loader2 } from 'lucide-react'

interface ExtractionDashboardProps {
  url: string
  onBack: () => void
}

type ExtractionStage = 'pending' | 'in-progress' | 'completed'

interface StageInfo {
  name: string
  description: string
  status: ExtractionStage
  icon: React.ComponentType<any>
  progress?: number
  details?: string
}

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
      details: 'Waiting to start...'
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
          return { ...s, status: 'completed' as ExtractionStage, progress: 100 }
        } else if (index === stage) {
          return { ...s, status: 'in-progress' as ExtractionStage }
        } else {
          return { ...s, status: 'pending' as ExtractionStage, progress: 0 }
        }
      }))
      
      setCurrentStage(stage)
      
      // Simulate progress for current stage
      if (stage === 0) {
        // Page Discovery stage
        let discoveredPages = 0
        const maxPages = 15
        const discoveryInterval = setInterval(() => {
          discoveredPages += Math.floor(Math.random() * 3) + 1
          if (discoveredPages > maxPages) discoveredPages = maxPages
          
          const progress = (discoveredPages / maxPages) * 100
          setStageStatuses(prev => prev.map((s, index) => 
            index === stage ? {
              ...s,
              progress,
              details: `Discovered ${discoveredPages} subpages`
            } : s
          ))
          
          if (discoveredPages >= maxPages) {
            clearInterval(discoveryInterval)
            setTimeout(() => {
              stage++
              if (stage < 3) updateStage()
            }, 500)
          }
        }, 300)
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
              setStageStatuses(prev => prev.map(s => ({ ...s, status: 'completed' as ExtractionStage, progress: 100 })))
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Extraction Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Extracting from: <span className="font-medium">{url}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Requirements & Progress */}
          <div className="space-y-6">
            {/* Extraction Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Extraction Requirements</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please provide detailed instructions on what data to extract from the provided URL. Be specific about the fields, formats, and any conditions for extraction.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the data you need to extract..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={6}
                  className="resize-none border-2 focus:border-primary transition-colors"
                  disabled={extractionStarted}
                />
                {!extractionStarted && (
                  <Button 
                    onClick={startExtraction}
                    disabled={!requirements.trim()}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Start Extraction
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Progress Overview */}
            {extractionStarted && (
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
                              <p className="text-sm font-medium text-foreground mb-2">
                                {stage.details}
                              </p>
                            )}
                            
                            {stage.status === 'in-progress' && (
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
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Download Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Download Results</CardTitle>
              </CardHeader>
              <CardContent>
                {!isCompleted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Extraction in Progress</h3>
                      <p className="text-muted-foreground">
                        Your data will be available here once extraction completes
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-center py-6 space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">
                        Extraction Complete!
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <h4 className="font-semibold">Extracted Data</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Format:</span>
                            <span className="ml-2 font-medium">CSV File</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Size:</span>
                            <span className="ml-2 font-medium">1.2 MB</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Records:</span>
                            <span className="ml-2 font-medium">2,847</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fields:</span>
                            <span className="ml-2 font-medium">12</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-200"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download File
                      </Button>

                      <div className="text-center pt-2">
                        <Button variant="link" className="text-sm text-muted-foreground">
                          Not satisfied? Refine extraction →
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Preview */}
            {isCompleted && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                      First 5 rows
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-medium">Title</th>
                            <th className="text-left py-2 px-3 font-medium">Price</th>
                            <th className="text-left py-2 px-3 font-medium">Category</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">Sample Product 1</td>
                            <td className="py-2 px-3">$29.99</td>
                            <td className="py-2 px-3">Electronics</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 px-3">Sample Product 2</td>
                            <td className="py-2 px-3">$15.50</td>
                            <td className="py-2 px-3">Books</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 text-muted-foreground">...</td>
                            <td className="py-2 px-3 text-muted-foreground">...</td>
                            <td className="py-2 px-3 text-muted-foregroun

">...</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
