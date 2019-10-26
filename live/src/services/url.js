import React, { useContext, useMemo } from 'react'

const UrlContext = React.createContext()

const UrlProvider = ({ baseUrl, params, children }) => {
  const value = useMemo(
    () => ({
      baseUrl,
      params: {
        user_id: params.user_id,
        event_id: params.event_id
      }
    }),
    [baseUrl, params.user_id, params.event_id]
  )

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>
}

const useBaseUrl = () => useContext(UrlContext).baseUrl

export { UrlContext, UrlProvider, useBaseUrl }
