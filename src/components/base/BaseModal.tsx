export function BaseModal({
  title,
  modalBody,
  onCloseClick,
}: {
  title: String
  modalBody: JSX.Element | JSX.Element[]
  onCloseClick: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <div className="base-modal-bg">
      <div className="base-modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <div className="close-btn" onClick={onCloseClick}>
            X
          </div>
        </div>
        <div className="modal-body-slot">{modalBody}</div>
      </div>
    </div>
  )
}
