import React, { useState, useEffect, useContext, useMemo } from 'react'

import { UrlContext } from 'services'

import Cache from './cache'

const EventContext = React.createContext()

const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null)
  const [reload, setReload] = useState(0)

  const { params } = useContext(UrlContext)

  const cache = useMemo(() => new Cache(setEvent, params), [params])

  useEffect(() => {
    cache.fetchEvent()
  }, [cache, reload])

  const makeDonation = useMemo(() => (...args) => cache.makeDonation(...args), [cache])

  const value = useMemo(
    () => ({
      event,
      makeDonation,
      sync: () => setReload(x => x + 1)
    }),
    [event, makeDonation]
  )

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

const useEvent = () => useContext(EventContext)

export { EventProvider, EventContext, useEvent }
