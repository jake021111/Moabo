import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)
const STORAGE_KEY = 'moabo-bookmarks'

function loadBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('keyword-select')
  const [selectedKeywords, setSelectedKeywords] = useState(new Set())
  const [bookmarks, setBookmarks] = useState(loadBookmarks)

  function toggleKeyword(keyword) {
    setSelectedKeywords(prev => {
      const next = new Set(prev)
      next.has(keyword) ? next.delete(keyword) : next.add(keyword)
      return next
    })
  }

  function toggleBookmark(workId) {
    setBookmarks(prev => {
      const next = new Set(prev)
      next.has(workId) ? next.delete(workId) : next.add(workId)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }

  return (
    <AppContext.Provider value={{ screen, setScreen, selectedKeywords, toggleKeyword, bookmarks, toggleBookmark }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
