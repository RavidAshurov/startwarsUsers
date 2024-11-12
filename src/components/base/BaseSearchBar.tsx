import { useState } from 'react'

export function BaseSearchBar({
  onSearchSubmit,
}: {
  onSearchSubmit: ({ search }: { search: string }) => void
}) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  function onSearchWordInput(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onSearchSubmit({ search: searchKeyword })
    }
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={searchKeyword}
        onKeyDown={onSearchWordInput}
        onChange={event => {
          setSearchKeyword(event.target.value)
        }}
      />
      <button
        className="button"
        onClick={() => onSearchSubmit({ search: searchKeyword })}
      >
        Search
      </button>
    </div>
  )
}
