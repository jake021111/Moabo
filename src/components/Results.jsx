import { useMemo, useState } from 'react'
import { useApp } from '../store/AppContext'
import worksData from '../data/works.json'
import WorkCard from './WorkCard'
import './Results.css'

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function Results() {
  const { selectedKeywords, setScreen, bookmarks, toggleBookmark } = useApp()
  const { categories, works } = worksData
  const [refreshKey, setRefreshKey] = useState(0)

  const results = useMemo(() => {
    return categories.map(cat => {
      const matches = works.filter(
        w => w.category === cat && w.keywords.some(k => selectedKeywords.has(k))
      )
      return { category: cat, works: pickRandom(matches, 3) }
    })
  }, [refreshKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="res-page">
      <header className="res-header">
        <button
          className="res-back"
          onClick={() => setScreen('keyword-select')}
          aria-label="키워드 선택으로 돌아가기"
        >
          ← 다시 선택
        </button>
        <span className="res-logo">모아보</span>
        <div className="res-header-actions">
          <button
            className="res-bookmark-nav"
            onClick={() => setScreen('bookmark')}
            aria-label={`북마크 ${bookmarks.size}개`}
          >
            북마크
            {bookmarks.size > 0 && (
              <span className="res-bookmark-badge">{bookmarks.size}</span>
            )}
          </button>
          <button
            className="res-refresh"
            onClick={() => setRefreshKey(k => k + 1)}
            aria-label="결과 새로고침"
          >
            새로고침
          </button>
        </div>
      </header>

      <div className="res-kw-area">
        <div className="res-selected" aria-label="선택한 키워드">
          {[...selectedKeywords].map(kw => (
            <span key={kw} className="res-kw-chip">{kw}</span>
          ))}
        </div>
        <button
          className="res-edit-kw"
          onClick={() => setScreen('keyword-select')}
        >
          키워드 수정
        </button>
      </div>

      <main className="res-main">
        {results.map(({ category, works: catWorks }) => (
          <section key={category} className="res-section">
            <h2 className="res-cat-title">{category}</h2>

            {catWorks.length === 0 ? (
              <p className="res-empty">해당 키워드 작품 없음</p>
            ) : (
              <ul className="res-cards">
                {catWorks.map(work => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    isBookmarked={bookmarks.has(work.id)}
                    onToggleBookmark={toggleBookmark}
                    keywords={work.keywords.filter(k => selectedKeywords.has(k))}
                  />
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </div>
  )
}
