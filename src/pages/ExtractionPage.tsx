import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ExtractionDashboard } from '@/components/ExtractionDashboard'

const ExtractionPage = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Get the actual URL from query parameters
  const url = searchParams.get('url')

  const handleBack = () => {
    navigate('/')
  }

  if (!taskId || !url) {
    navigate('/')
    return null
  }

  return (
    <ThemeProvider defaultTheme="light">
      <ExtractionDashboard url={url} onBack={handleBack} />
    </ThemeProvider>
  )
}

export default ExtractionPage
