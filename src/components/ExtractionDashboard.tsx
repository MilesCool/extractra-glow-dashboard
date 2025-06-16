import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from './Navigation'
import { CheckCircle, Clock, FileText, Search, Download, ArrowLeft, Loader2 } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'
import { ExtractionHeader } from './ExtractionHeader'

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
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [extractionResult, setExtractionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [stageStatuses, setStageStatuses] = useState<StageInfo[]>([
    {
      name: 'Page Discovery',
      description: 'Analyzing website structure and discovering pages',
      status: 'pending',
      icon: Search,
      progress: 0,
      details: 'Waiting to start...',
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

  const startExtraction = async () => {
    if (!requirements.trim()) return
    
    setExtractionStarted(true)
    setError(null)
    
    try {
      // Start extraction via API
      const response = await fetch(API_ENDPOINTS.EXTRACTION_START, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          requirements: requirements
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to start extraction')
      }
      
      const data = await response.json()
      setSessionId(data.session_id)
      
      // Connect to WebSocket for real-time updates
      connectWebSocket(data.session_id)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start extraction')
      setExtractionStarted(false)
    }
  }
  
  const connectWebSocket = (sessionId: string) => {
    const wsUrl = API_ENDPOINTS.WEBSOCKET_EXTRACTION(sessionId)
    console.log('Connecting to WebSocket:', wsUrl)
    
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws
    
    // Set connection timeout
    const connectionTimeout = setTimeout(() => {
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.close()
        setError('Connection timeout - please try again')
      }
    }, 10000) // 10 second timeout
    
    ws.onopen = () => {
      clearTimeout(connectionTimeout)
      console.log('Secure WebSocket connected successfully')
      
      // Send initial ping to establish connection
      ws.send(JSON.stringify({ type: 'ping' }))
    }
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log('WebSocket message received:', message)
        
        switch (message.type) {
          case 'pong':
            console.log('WebSocket connection confirmed')
            break
          case 'stage_update':
            handleStageUpdate(message.stage_index, message.stage, message.overall_progress)
            break
          case 'extraction_completed':
            handleExtractionCompleted(message.result)
            break
          case 'extraction_error':
            handleExtractionError(message.error)
            break
          default:
            console.log('Unknown message type:', message.type)
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }
    
    ws.onclose = (event) => {
      clearTimeout(connectionTimeout)
      console.log('WebSocket disconnected:', event.code, event.reason)
      
      // Handle different close codes
      if (event.code === 1006) {
        setError('Connection lost - please refresh the page')
      } else if (event.code !== 1000) {
        setError('Connection error occurred')
      }
    }
    
    ws.onerror = (error) => {
      clearTimeout(connectionTimeout)
      console.error('WebSocket error:', error)
      setError('Failed to establish secure connection')
    }
    
    // Keep connection alive with periodic pings
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }))
      } else {
        clearInterval(pingInterval)
      }
    }, 30000) // Ping every 30 seconds
    
    // Store ping interval for cleanup
    pingIntervalRef.current = pingInterval
  }
  
  const handleStageUpdate = (stageIndex: number, stage: any, overallProgress: number) => {
    console.log('Received stage update:', { stageIndex, stage, overallProgress })
    
    setStageStatuses(prev => prev.map((s, index) => 
      index === stageIndex ? {
        ...s,
        status: stage.status,
        progress: stage.progress,
        details: stage.details
      } : s
    ))
    setOverallProgress(overallProgress)
    setCurrentStage(stageIndex)
  }
  
  const handleExtractionCompleted = (result: any) => {
    setIsCompleted(true)
    setExtractionResult(result)
    setOverallProgress(100)
  }
  
  const handleExtractionError = (errorMessage: string) => {
    setError(errorMessage)
    setExtractionStarted(false)
  }
  
  const downloadResult = async () => {
    if (!sessionId) return
    
    try {
      const response = await fetch(API_ENDPOINTS.EXTRACTION_DOWNLOAD(sessionId))
      if (!response.ok) {
        throw new Error('Failed to download result')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `extraction_${sessionId}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download result')
    }
  }
  
  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <ExtractionHeader url={url} onBack={onBack} />

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
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}
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
                            
                            {/* Stage specific details */}
                            {stage.details && (
                              <p className="text-sm font-medium text-foreground mb-2">
                                {stage.details}
                              </p>
                            )}
                            
                            {/* Progress display based on stage type */}
                            {stage.status === 'in-progress' && (
                              <div className="mt-2">
                                {index === 0 ? (
                                  // Page Discovery stage - show loading icon
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Analyzing website...</span>
                                  </div>
                                ) : (
                                  // Other stages - show progress bar
                                  <Progress value={stage.progress || 0} className="h-2" />
                                )}
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
                            <span className="ml-2 font-medium">{extractionResult?.format || 'CSV File'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Size:</span>
                            <span className="ml-2 font-medium">{extractionResult?.size || '1.2 MB'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Records:</span>
                            <span className="ml-2 font-medium">{extractionResult?.records || '2,847'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fields:</span>
                            <span className="ml-2 font-medium">{extractionResult?.fields || '12'}</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={downloadResult}
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
