
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Extractra
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              How it works
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Features
            </Button>
            <Button variant="outline">
              Login
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
