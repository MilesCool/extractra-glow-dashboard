
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navigation } from './Navigation'
import { ExtractionDashboard } from './ExtractionDashboard'
import { HowItWorksSection } from './HowItWorksSection'
import { FeaturesSection } from './FeaturesSection'
import { Footer } from './Footer'

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
      <main id="hero" className="flex-1 flex items-center justify-center px-6 py-20">
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
            {/* Emphasis text above input */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                一键获取所需数据
              </h2>
              <p className="text-lg text-muted-foreground">
                输入网站地址，智能提取您需要的所有数据
              </p>
            </div>

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
              <p className="text-lg font-medium text-custom">
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
        </div>
      </main>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
