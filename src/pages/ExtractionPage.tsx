
import { useParams, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ExtractionDashboard } from '@/components/ExtractionDashboard'

const ExtractionPage = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()

  // For now, we'll use a mock URL based on taskId
  // In a real app, you'd fetch the task details from an API
  const mockUrl = `https://example-${taskId}.com`

  const handleBack = () => {
    navigate('/')
  }

  if (!taskId) {
    navigate('/')
    return null
  }

  return (
    <ThemeProvider defaultTheme="light">
      <ExtractionDashboard url={mockUrl} onBack={handleBack} />
    </ThemeProvider>
  )
}

export default ExtractionPage
