export function BasePaginationBar({
  currentPage,
  nextPageExist,
  onNextClick,
  onPrevClick,
}: {
  currentPage: number
  nextPageExist: boolean
  onNextClick: ({ page }: { page: number }) => void
  onPrevClick: ({ page }: { page: number }) => void
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="button"
          onClick={() => onPrevClick({ page: currentPage - 1 })}
        >
          Previous Page
        </button>
      )}
      page: {currentPage}
      {nextPageExist && (
        <button
          className="button"
          onClick={() => onNextClick({ page: currentPage + 1 })}
        >
          Next Page
        </button>
      )}
    </div>
  )
}
