import { IPlanet } from '../types/systemTypes'

export async function fetchPlanet(planetFetchUrl: string): Promise<IPlanet> {
  try {
    let res: any = await fetch(planetFetchUrl)
    res = (await res.json()) as IPlanet
    return res
  } catch (err: any) {
    console.error(`failed to fetch planet ${planetFetchUrl}`, err)
    throw new Error(err?.message || 'Something went wrong')
  }
}
