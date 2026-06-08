import { AppProvider, useApp } from './store/AppContext'
import KeywordSelect from './components/KeywordSelect'
import Results from './components/Results'
import Bookmark from './components/Bookmark'

function AppScreens() {
  const { screen } = useApp()

  if (screen === 'results')  return <Results />
  if (screen === 'bookmark') return <Bookmark />
  return <KeywordSelect />
}

export default function App() {
  return (
    <AppProvider>
      <AppScreens />
    </AppProvider>
  )
}
