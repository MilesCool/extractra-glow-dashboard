
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RequirementsCardProps {
  requirements: string
  setRequirements: (value: string) => void
  extractionStarted: boolean
  onStartExtraction: () => void
}

export function RequirementsCard({ 
  requirements, 
  setRequirements, 
  extractionStarted, 
  onStartExtraction 
}: RequirementsCardProps) {
  return (
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
        {!extractionStarted && (
          <Button 
            onClick={onStartExtraction}
            disabled={!requirements.trim()}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            Start Extraction
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
