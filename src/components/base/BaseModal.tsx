export function BaseModal({
  title,
  children,
  onCloseClick,
}: {
  title: String
  children: JSX.Element | JSX.Element[]
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
        <div className="modal-body-slot">{children}</div>
      </div>
    </div>
  )
}
