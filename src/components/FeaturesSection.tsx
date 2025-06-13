
import { Zap, Shield, Cpu, Globe, Database, Clock } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Extract data from websites in seconds, not hours. Our optimized multi-agent system ensures rapid processing."
    },
    {
      icon: Shield,
      title: "Reliable & Accurate",
      description: "Advanced AI algorithms ensure high accuracy in data extraction with built-in validation and error checking."
    },
    {
      icon: Cpu,
      title: "Multi-Agent Intelligence",
      description: "Specialized AI agents work together to discover, extract, and integrate data with unprecedented efficiency."
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works with any website structure, from simple blogs to complex e-commerce platforms and web applications."
    },
    {
      icon: Database,
      title: "Structured Output",
      description: "Get clean, organized data in your preferred format - CSV, JSON, Excel, or custom schemas."
    },
    {
      icon: Clock,
      title: "Real-Time Processing",
      description: "Monitor extraction progress in real-time with detailed status updates and live feedback."
    }
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for intelligent data extraction, powered by cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-lg warm-surface border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
