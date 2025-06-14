
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Download } from 'lucide-react'

interface ResultsCardProps {
  isCompleted: boolean
}

export function ResultsCard({ isCompleted }: ResultsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Download Results</CardTitle>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Extraction in Progress</h3>
              <p className="text-muted-foreground">
                Your data will be available here once extraction completes
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">
                Extraction Complete!
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-semibold">Extracted Data</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Format:</span>
                    <span className="ml-2 font-medium">CSV File</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium">1.2 MB</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Records:</span>
                    <span className="ml-2 font-medium">2,847</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fields:</span>
                    <span className="ml-2 font-medium">12</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Download File
              </Button>

              <div className="text-center pt-2">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Not satisfied? Refine extraction →
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
