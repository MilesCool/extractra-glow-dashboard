
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navigation } from './Navigation'
import { ExtractionDashboard } from './ExtractionDashboard'

export function Homepage() {
  const [url, setUrl] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)

  const handleStart = () => {
    if (url.trim()) {
      console.log('Starting extraction for:', url)
      setIsExtracting(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart()
    }
  }

  if (isExtracting) {
    return <ExtractionDashboard url={url} onBack={() => setIsExtracting(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              <span className="text-foreground">Data Extraction</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Automatically discover pages, extract content, and integrate the output into structured data files. 
              Powered by multi-agent intelligence.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="space-y-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="Enter website URL to extract data from..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 text-lg px-6 bg-card border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <Button
                  onClick={handleStart}
                  disabled={!url.trim()}
                  className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start
                </Button>
              </div>
            </div>

            {/* Slogan */}
            <div className="space-y-4">
              <p className="text-lg font-medium warm-text">
                Transform any website into structured data in seconds
              </p>
              
              {/* Feature bullets */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Auto-discovery
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  Smart extraction
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Instant results
                </div>
              </div>
            </div>
          </div>

          {/* How it works preview */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3 p-6 rounded-lg warm-surface border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold text-lg">Page Discovery</h3>
                <p className="text-muted-foreground">
                  Our agents automatically explore and map your target website's structure
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-lg warm-surface border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold text-lg">Content Extraction</h3>
                <p className="text-muted-foreground">
                  Intelligent extraction based on your specific requirements and data needs
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-lg warm-surface border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold text-lg">Result Integration</h3>
                <p className="text-muted-foreground">
                  Clean, structured data delivered in your preferred format ready to use
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
