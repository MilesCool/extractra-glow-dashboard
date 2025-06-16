
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface ExtractionHeaderProps {
  url: string
  onBack: () => void
}

export function ExtractionHeader({ url, onBack }: ExtractionHeaderProps) {
  return (
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
  )
}
