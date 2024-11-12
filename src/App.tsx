/**
 * TODO:
 * 9. readme
 * 10. cleanup
 * 11. read about phrases from the doc
 * 12. tech design doc
 * 13. GPT the submit message
 * 14. upload to Git
 * 15. rename the app
 */

import { useEffect, useState } from 'react'
import './App.css'
import { User } from './types/systemTypes'
import { fetchUsers, fetchUsersResponse } from './services/usersService'
import { UserCard } from './components/UserCard'
import { UserModal } from './components/UserModal'
import { BasePaginationBar } from './components/base/BasePaginationBar'
import { BaseSearchBar } from './components/base/BaseSearchBar'
import {
  BaseSnackbar,
  SNACKBAR_MESSAGE_TYPE,
} from './components/base/BaseSnackbar'

function App() {
  const [users, setUsers] = useState<Array<User>>([])
  const [{ currentPage, nextPageExist }, setPage] = useState<{
    currentPage: number
    nextPageExist: boolean
  }>({ currentPage: 0, nextPageExist: false })
  const [userModalData, setUserModalData] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<{ [key: number]: User }>({})
  const [snackbarData, setSnackbar] = useState<{
    message: string
    level?: string
  }>()

  useEffect(() => {
    fetchUsersData()
  }, [])

  async function fetchUsersData({
    page,
    search,
  }: { page?: number; search?: string } = {}) {
    try {
      const { data, currentPage, nextPageExist }: fetchUsersResponse =
        await fetchUsers({ search, page })
      setUsers(data)
      setPage({ currentPage, nextPageExist })
      setSnackbar({
        message: 'Users obtained successfully.',
        level: SNACKBAR_MESSAGE_TYPE.SUCCESS,
      })
    } catch (error) {
      const err = error as Error
      setSnackbar({
        message: err?.message || 'Unable to obtain users data.',
        level: SNACKBAR_MESSAGE_TYPE.ERROR,
      })
      console.error(error)
    }
  }

  function addUserToFavorites(user: User) {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [user.id]: user,
    }))
  }

  function removeUserFromFavorites(user: User) {
    setFavorites(prevFavorites => {
      const newFavorites = { ...prevFavorites }
      delete newFavorites[user.id]
      return newFavorites
    })
  }

  return (
    <div className="App">
      <div className="main-view">
        {snackbarData && (
          <BaseSnackbar
            message={snackbarData.message}
            level={snackbarData.level}
          />
        )}
        <h1 className="page-title">StarWars Users</h1>
        <div className="lists-container">
          <div className="users-list">
            <BaseSearchBar onSearchSubmit={fetchUsersData} />
            <div className="list-items-container">
              {users.map(user => (
                <UserCard
                  key={`${user.id}`}
                  user={user}
                  onButtonClick={() => addUserToFavorites(user)}
                  buttonText="Add to favorites"
                  onCardClick={() => setUserModalData(user)}
                />
              ))}
            </div>
            <BasePaginationBar
              currentPage={currentPage}
              nextPageExist={nextPageExist}
              onNextClick={() => fetchUsersData({ page: currentPage + 1 })}
              onPrevClick={() => fetchUsersData({ page: currentPage - 1 })}
            />
          </div>
          <div className="users-list">
            <span className="favorite-list-title">Favorites:</span>
            <div className="list-items-container">
              {Array.from(Object.values(favorites)).map((user: User) => (
                <UserCard
                  key={`${user.id}`}
                  user={user}
                  onButtonClick={() => removeUserFromFavorites(user)}
                  buttonText="Remove from favorites"
                  onCardClick={() => setUserModalData(user)}
                />
              ))}
            </div>
          </div>
        </div>
        {userModalData && (
          <UserModal
            user={userModalData}
            onCloseClick={() => setUserModalData(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
