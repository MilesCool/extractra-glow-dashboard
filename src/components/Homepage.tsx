import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navigation } from './Navigation'
import { HowItWorksSection } from './HowItWorksSection'
import { FeaturesSection } from './FeaturesSection'
import { Footer } from './Footer'

export function Homepage() {
  const [url, setUrl] = useState('')
  const [displayText, setDisplayText] = useState('')
  const navigate = useNavigate()
  
  const fullText = "Simply describe what you need and get your data in one click"

  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const handleStart = () => {
    if (url.trim()) {
      console.log('Starting extraction for:', url)
      // Generate a simple task ID based on timestamp
      const taskId = Date.now().toString()
      navigate(`/extraction/${taskId}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart()
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-background dark:via-background/95 dark:to-slate-900/20">
        {/* Floating Elements - Enhanced for light mode, subdued for dark mode */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-purple-900/15 dark:to-slate-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/25 dark:from-purple-800/12 dark:to-slate-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 dark:from-purple-900/10 dark:to-slate-800/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional light mode elements */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-purple-800/8 dark:to-slate-700/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-10 w-52 h-52 bg-gradient-to-br from-violet-200/25 to-purple-200/25 dark:from-purple-900/8 dark:to-slate-800/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Subtle texture overlay for light mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-transparent animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <main id="hero" className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  Intelligent
                </span>
                <br />
                <span className="text-foreground">Data Extraction</span>
              </h1>
              
              <div className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed min-h-[3rem] px-4">
                <span className="typing-text inline-block break-words whitespace-normal overflow-wrap-anywhere">{displayText}</span>
              </div>
            </div>

            {/* URL Input Section */}
            <div className="space-y-8">
              <div className="relative w-full sm:w-96 md:w-[32rem] lg:w-[40rem] mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="url"
                    placeholder="Enter website URL to extract data from..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-14 text-lg px-6 bg-card/90 backdrop-blur-sm border-2 border-border focus:border-primary transition-all duration-200 flex-1 min-w-0 shadow-lg"
                  />
                  <Button
                    onClick={handleStart}
                    disabled={!url.trim()}
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap sm:w-auto w-full"
                    style={{ minWidth: '120px' }}
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
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    Auto-discovery
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    Smart extraction
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '1s' }}></div>
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
    </div>
  )
}
