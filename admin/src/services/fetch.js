import { useContext, useMemo } from 'react'

import { UserContext } from './firebase'

export const BASE_FUNCTIONS_URL = 'https://europe-west1-scan-and-give.cloudfunctions.net'

export const useFetch = () => {
  const { user } = useContext(UserContext)

  const memoizedFetch = useMemo(
    () => (url, options = {}) =>
      fetch(`${BASE_FUNCTIONS_URL}/admin/${url}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${user.ma}`,
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...options.headers
        }
      }),
    [user]
  )

  return memoizedFetch
}

const cache = {}

export const useCachedFetch = () => {
  const { user } = useContext(UserContext)

  const memoizedFetch = useMemo(
    () => (url, options = {}) => ({
      onData: (cb = () => {}) => {
        if (!cache[user.uid]) cache[user.uid] = {}

        if (cache[user.uid][url]) {
          cb(cache[user.uid][url], true)
        }

        fetch(`${BASE_FUNCTIONS_URL}/admin/${url}`, {
          ...options,
          headers: {
            Authorization: `Bearer ${user.ma}`,
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers
          }
        })
          .then(r => r.json())
          .then(data => {
            cache[user.uid][url] = data
            cb(data, false)
          })
      }
    }),
    [user]
  )

  return memoizedFetch
}
