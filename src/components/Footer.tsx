
export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Extractra
            </div>
            <p className="text-muted-foreground">
              Intelligent data extraction powered by multi-agent AI technology.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>

          {/* How it Works */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">How it Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Tutorial</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Examples</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Best Practices</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">All Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Auto Discovery</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Smart Extraction</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Data Integration</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Extractra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
