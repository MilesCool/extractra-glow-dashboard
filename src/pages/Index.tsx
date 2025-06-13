
import { ThemeProvider } from '@/components/ThemeProvider'
import { Homepage } from '@/components/Homepage'

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <Homepage />
    </ThemeProvider>
  )
}

export default Index
