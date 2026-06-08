import './WorkCard.css'

const GRADIENTS = {
  '게임': 'linear-gradient(135deg, #a7f3d0 0%, #34d399 100%)',
  '애니': 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)',
  '영화': 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
  '웹툰': 'linear-gradient(135deg, #c7d2fe 0%, #818cf8 100%)',
}

export default function WorkCard({ work, isBookmarked, onToggleBookmark, keywords }) {
  const gradient = GRADIENTS[work.category] ?? 'linear-gradient(135deg, #e5e7eb, #d1d5db)'

  return (
    <li className="wc-card">
      <div className="wc-visual" style={{ background: gradient }}>
        <span className="wc-emoji" aria-hidden="true">{work.emoji}</span>
        <button
          className={`wc-heart${isBookmarked ? ' wc-heart--active' : ''}`}
          onClick={() => onToggleBookmark(work.id)}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        >
          {isBookmarked ? '♥' : '♡'}
        </button>
      </div>

      <div className="wc-info">
        <span className="wc-cat">{work.category}</span>
        <h3 className="wc-title">{work.title}</h3>
        {keywords.length > 0 && (
          <div className="wc-kws">
            {keywords.map(k => (
              <span key={k} className="wc-kw">{k}</span>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}
