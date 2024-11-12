import { User } from '../types/systemTypes'

export function UserCard({
  user,
  onButtonClick,
  buttonText,
  onCardClick,
}: {
  user: User
  onButtonClick: () => void
  buttonText: String
  onCardClick: () => void
}) {
  return (
    <div className="user-card">
      <span onClick={onCardClick} className="card-details">
        <img
          className="user-image"
          src={`https://picsum.photos/200?random=${user.id}`}
          alt={user.name + ' image'}
        />
        <span className="user-name-label">{user.name}</span>
      </span>
      <button onClick={onButtonClick} className="user-card-btn">
        {buttonText}
      </button>
    </div>
  )
}
