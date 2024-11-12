import stringHash from 'string-hash'
import { IPeople, User, IPeopleResponse } from '../types/systemTypes'

const API_SERVER_URL = 'https://swapi.dev/api/'

export interface fetchUsersResponse {
  data: Array<User>
  currentPage: number
  nextPageExist: boolean
}

export async function fetchUsers({
  search,
  page,
}: {
  search?: string
  page?: number
} = {}): Promise<fetchUsersResponse> {
  if (search && !search.match(/^[ a-zA-Z0-9,.-:]{2,}$/)) {
    throw new Error('Invalid search phrase')
  }

  try {
    const params: Array<string> = []

    if (search) {
      params.push(`search=${search}`)
    }

    if (page) {
      params.push(`page=${page}`)
    }

    const resStream: Response = await fetch(
      `${API_SERVER_URL}/people${params.length ? `?${params.join('&')}` : ''}`
    )
    const res: IPeopleResponse = await resStream.json()
    const data: Array<User> = res?.results.map?.((resource: IPeople) => ({
      ...resource,
      id: stringHash(resource.name),
    }))
    return {
      data,
      currentPage: page || 1,
      nextPageExist: !!res.next,
    }
  } catch (err: any) {
    console.error('failed to fetch users', err)
    throw new Error(err?.message || 'Something went wrong')
  }
}
