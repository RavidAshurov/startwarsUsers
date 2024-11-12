import { User, IPlanet } from '../types/systemTypes'
import { BaseModal } from './base/BaseModal'
import { useEffect, useState } from 'react'
import { fetchPlanet } from '../services/planetsService'
import { BaseSnackbar, SNACKBAR_MESSAGE_TYPE } from './base/BaseSnackbar'

export function UserModal({
  user,
  onCloseClick,
}: {
  user: User
  onCloseClick: React.MouseEventHandler<HTMLDivElement>
}) {
  const [planet, setPlanet] = useState<IPlanet | null>(null)
  const [snackbarData, setSnackbar] = useState<{
    message: string
    level?: string
  }>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IPlanet = await fetchPlanet(user.homeworld)
        setPlanet(data)
        setSnackbar({
          message: "User's home world data obtained successfully.",
          level: SNACKBAR_MESSAGE_TYPE.SUCCESS,
        })
      } catch (error) {
        const err = error as Error
        setSnackbar({
          message:
            err?.message || "Unable to obtain the user's home world data.",
          level: SNACKBAR_MESSAGE_TYPE.ERROR,
        })
        console.error(error)
      }
    }
    fetchData()
  }, [user.homeworld])

  return (
    <>
      {snackbarData && (
        <BaseSnackbar
          message={snackbarData.message}
          level={snackbarData.level}
        />
      )}
      <BaseModal
        title={user.name}
        onCloseClick={onCloseClick}
        modalBody={
          <div className="user-modal-body">
            <img
              className="user-image"
              src="https://picsum.photos/200"
              alt={user.name + ' image'}
            />
            <div className="user-details">
              <div>
                <span className="field-title">Height (m): </span>
                {Number(user.height) / 100}{' '}
              </div>
              <div>
                <span className="field-title">Mass (kg): </span>
                {user.mass}
              </div>
              <div>
                <span className="field-title">Birth year: </span>
                {user.birth_year}{' '}
              </div>
              <div>
                <span className="field-title">Films count: </span>
                {user.films?.length || 0}{' '}
              </div>
              {planet && (
                <div>
                  <span className="field-title">Home world details: </span>
                  <ul>
                    <li>name: {planet.name}</li>
                    <li>terrain: {planet.terrain}</li>
                    <li>climate: {planet.climate}</li>
                    <li>population: {planet.population}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        }
      />
    </>
  )
}
