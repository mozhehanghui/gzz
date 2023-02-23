import { Dispatch, SetStateAction } from 'react'

export const updateState = <T extends { id: string; selected: boolean }>(
  id: string,
  apps: T[],
  setState?: Dispatch<SetStateAction<T[]>>,
) => {
  const results = apps.map(app => {
    if (app.id === id) {
      return {
        ...app,
        selected: true,
      }
    } else {
      return {
        ...app,
        selected: false,
      }
    }
  })

  return results
}
