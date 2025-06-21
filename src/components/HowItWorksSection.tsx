
import { Search, Brain, Download } from 'lucide-react'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent multi-agent system processes your requests through three sophisticated stages
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Page Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our discovery agent automatically crawl and map your target website, 
                identifying all relevant pages and understanding the site structure 
                to ensure comprehensive data extraction.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Content Extraction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced AI agent analyze page content, understand context, 
                and extract precisely the data you need according to your 
                specifications and requirements.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Download className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Result Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Process and structure the extracted data 
                into clean, organized formats ready for immediate use in 
                your applications and workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
