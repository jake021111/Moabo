import { useApp } from '../store/AppContext'
import worksData from '../data/works.json'
import WorkCard from './WorkCard'
import './Bookmark.css'

export default function Bookmark() {
  const { bookmarks, toggleBookmark, setScreen } = useApp()
  const { categories, works } = worksData

  const bookmarkedWorks = works.filter(w => bookmarks.has(w.id))

  // preserve original category order from works.json
  const grouped = categories
    .map(cat => ({ cat, items: bookmarkedWorks.filter(w => w.category === cat) }))
    .filter(g => g.items.length > 0)

  return (
    <div className="bm-page">
      <header className="bm-header">
        <button
          className="bm-back"
          onClick={() => setScreen('results')}
          aria-label="결과 화면으로 돌아가기"
        >
          ← 결과로
        </button>
        <span className="bm-logo">모아보</span>
        <div className="bm-header-end" aria-hidden="true" />
      </header>

      <h1 className="bm-title">
        북마크
        {bookmarkedWorks.length > 0 && (
          <span className="bm-count">{bookmarkedWorks.length}</span>
        )}
      </h1>

      {bookmarkedWorks.length === 0 ? (
        <div className="bm-empty">
          <span className="bm-empty-icon">♡</span>
          <p className="bm-empty-text">북마크한 작품이 없어요</p>
          <p className="bm-empty-sub">
            결과 화면에서 마음에 드는 작품의<br />하트를 눌러 저장해보세요
          </p>
        </div>
      ) : (
        <main className="bm-main">
          {grouped.map(({ cat, items }) => (
            <section key={cat} className="bm-section">
              <h2 className="bm-cat-title">{cat}</h2>
              <ul className="bm-cards">
                {items.map(work => (
                  <WorkCard
                    key={work.id}
                    work={work}
                    isBookmarked={true}
                    onToggleBookmark={toggleBookmark}
                    keywords={work.keywords}
                  />
                ))}
              </ul>
            </section>
          ))}
        </main>
      )}
    </div>
  )
}
