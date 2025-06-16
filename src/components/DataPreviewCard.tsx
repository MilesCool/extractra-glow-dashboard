
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DataPreviewCardProps {
  isCompleted: boolean
}

export function DataPreviewCard({ isCompleted }: DataPreviewCardProps) {
  if (!isCompleted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            First 5 rows
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium">Title</th>
                  <th className="text-left py-2 px-3 font-medium">Price</th>
                  <th className="text-left py-2 px-3 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3">Sample Product 1</td>
                  <td className="py-2 px-3">$29.99</td>
                  <td className="py-2 px-3">Electronics</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3">Sample Product 2</td>
                  <td className="py-2 px-3">$15.50</td>
                  <td className="py-2 px-3">Books</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-muted-foreground">...</td>
                  <td className="py-2 px-3 text-muted-foreground">...</td>
                  <td className="py-2 px-3 text-muted-foreground">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
