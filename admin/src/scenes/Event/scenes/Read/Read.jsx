import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'
import compareDesc from 'date-fns/compareDesc'

import { formatMoney, useTotal, formatTimestamp } from 'utils'
import { useCachedFetch } from 'services'
import { Loading } from 'components'

import { ApiModal, CharitiesTable, DonationsTable, LiveModal } from './components'

import './Read.scss'

const Read = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [reload, setReload] = useState(0)

  const [modal, setModal] = useState(null)

  const fetch = useCachedFetch()

  useEffect(() => {
    fetch(`event/${match.params.id}`).onData(({ event }) => {
      const donations = Object.entries(event.donations || {})
      donations.sort((a, b) =>
        compareDesc(fromUnixTime(a[1].date._seconds), fromUnixTime(b[1].date._seconds))
      )
      event.charities.sort((a, b) => b.count - a.count)
      setEvent({
        ...event,
        donations
      })
      setLoading(false)
    })
  }, [fetch, match.params.id, reload])

  const [count, total] = useTotal((event || {}).charities)

  const doReload = useMemo(() => () => setReload(x => x + 1), [])

  if (loading) return <Loading />

  return (
    <>
      <div className="event-read">
        <div className="event-actions">
          <div>
            <Link to="/event/list">
              <button className="button">Back</button>
            </Link>
          </div>
          <div className="buttons">
            <button
              className="button"
              onClick={() => setModal('api_modal')}
              data-tooltip="API endpoints"
            >
              <span className="icon">
                <i className="fas fa-code" />
              </span>
            </button>
            <button
              className="button is-success"
              onClick={() => setModal('live_modal')}
              data-tooltip="View live"
            >
              <span className="icon">
                <i className="fas fa-eye" />
              </span>
            </button>
            <Link to={match.url + '/edit'} style={{ marginLeft: '20px' }}>
              <button className="button is-info" data-tooltip="Edit event">
                <span className="icon">
                  <i className="fas fa-pen" />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="event-metadata">
          <div className="event-image" style={{ backgroundColor: event.color }}>
            <img src={event.image} alt="Logo of the event" />
          </div>
          <div className="event-metadata-wrapper">
            <div className="event-name">
              <span className="title is-3">{event.name}</span>
            </div>
            <div className="event-numbers">
              <span>
                <span>
                  <i className="fas fa-calendar-day has-text-info fa-2x" />
                </span>
                <span className="subtitle is-4">{formatTimestamp(event.date)}</span>
              </span>
              <span>
                <span>
                  <i className="far fa-handshake has-text-info fa-2x" />
                </span>
                <span className="subtitle is-4">
                  {event.charities.length} charit{event.charities.length !== 1 ? 'y' : 'ies'}
                </span>
              </span>
              <span>
                <span>
                  <i className="fas fa-user-friends has-text-info fa-2x" />
                </span>
                <span className="subtitle is-4">
                  {count} donation{count !== 1 && 's'}
                </span>
              </span>
              <span>
                <span>
                  <i className="fas fa-coins has-text-info fa-2x" />
                </span>
                <span className="subtitle is-4">{formatMoney(total)}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="event-tables">
          <div className="event-charities">
            <CharitiesTable event={event} onChange={doReload} />
          </div>
          <div className="event-donations">
            <DonationsTable event={event} onChange={doReload} />
          </div>
        </div>
      </div>
      <ApiModal active={modal === 'api_modal'} onClose={() => setModal(null)} event={event} />
      <LiveModal active={modal === 'live_modal'} onClose={() => setModal(null)} event={event} />
    </>
  )
}

export default Read
