import { useApp } from '../store/AppContext'
import worksData from '../data/works.json'
import './KeywordSelect.css'

export default function KeywordSelect() {
  const { selectedKeywords, toggleKeyword, setScreen } = useApp()
  const { keywords } = worksData

  return (
    <div className="kw-page">
      <header className="kw-header">
        <span className="kw-logo">모아보</span>
      </header>

      <main className="kw-main">
        <div className="kw-intro">
          <h1 className="kw-title">어떤 작품이 끌리나요?</h1>
          <p className="kw-desc">키워드를 골라 취향에 맞는 작품을 추천받으세요</p>
        </div>

        <div className="kw-chips" role="group" aria-label="키워드 선택">
          {keywords.map(kw => (
            <button
              key={kw}
              className={`kw-chip${selectedKeywords.has(kw) ? ' kw-chip--active' : ''}`}
              onClick={() => toggleKeyword(kw)}
              aria-pressed={selectedKeywords.has(kw)}
            >
              {kw}
            </button>
          ))}
        </div>

        <p className="kw-hint">
          {selectedKeywords.size > 0
            ? `${selectedKeywords.size}개 선택됨`
            : '1개 이상 선택해주세요'}
        </p>

        <button
          className="kw-submit"
          disabled={selectedKeywords.size === 0}
          onClick={() => setScreen('results')}
        >
          추천받기
        </button>
      </main>
    </div>
  )
}
