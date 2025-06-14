
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = () => {
    // Scroll to top of the page (landing page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Check if we're in a Clerk provider context
  const hasClerkProvider = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div 
              className="cursor-pointer group transition-all duration-200 hover:scale-105"
              onClick={handleLogoClick}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Extractra
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-transparent"
              onClick={() => scrollToSection('how-it-works')}
            >
              How it works
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-transparent"
              onClick={() => scrollToSection('features')}
            >
              Features
            </Button>
            
            {hasClerkProvider ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            ) : (
              <Button variant="outline" disabled>
                Login (Setup Required)
              </Button>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            {hasClerkProvider ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
