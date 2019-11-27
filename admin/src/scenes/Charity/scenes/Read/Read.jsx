import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'
import compareDesc from 'date-fns/compareDesc'

import { formatMoney, useTotal, formatTimestamp } from 'utils'
import { useCachedFetch } from 'services'
import { Loading } from 'components'

import './Read.scss'

const Read = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [charity, setCharity] = useState(null)

  const fetch = useCachedFetch()

  useEffect(() => {
    fetch(`charity/${match.params.id}`).onData(({ charity }) => {
      charity.events = charity.events.sort((a, b) =>
        compareDesc(fromUnixTime(a.event.date), fromUnixTime(b.event.date))
      )
      setCharity(charity)
      setLoading(false)
    })
  }, [fetch, match.params.id])

  const [count, total] = useTotal((charity || {}).events)

  if (loading) return <Loading />

  return (
    <div className="charity-read">
      <div className="charity-actions">
        <div>
          <Link to="/charity/list">
            <button className="button">Back</button>
          </Link>
        </div>
        <div>
          <Link to={match.url + '/edit'}>
            <button className="button is-info" data-tooltip="Edit charity">
              <span className="icon">
                <i className="fas fa-pen" />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="charity-metadata">
        <div className="charity-image">
          <img src={charity.image} alt="Logo of the charity" />
        </div>
        <div className="charity-metadata-wrapper">
          <div className="charity-name">
            <span className="title is-3">{charity.name}</span>
          </div>
          <div className="charity-numbers">
            <span>
              <span>
                <i className="far fa-calendar-alt has-text-info fa-2x" />
              </span>
              <span className="subtitle is-4">
                {charity.events.length} event{charity.events.length !== 1 && 's'}
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
      <div className="charity-events">
        <p className="subtitle is-5">Events</p>
        <table className="table is-bordered is-hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Donations</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {charity.events.map(event => (
              <tr key={event.event.id}>
                <td>
                  <Link to={`/event/${event.event.id}`}>{event.event.name}</Link>
                </td>
                <td>{formatTimestamp(event.event.date)}</td>
                <td>{event.count}</td>
                <th>{formatMoney(event.count * event.multiplier, event.devise)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="charity-text">
        <div className="charity-description">
          <p className="subtitle is-5 has-text-centered">Description</p>
          <div className="content">
            {charity.description.split('\n\n').map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
        </div>
        <div className="charity-notes">
          <p className="subtitle is-5 has-text-centered">Personal notes</p>
          <div className="content">
            {charity.notes.split('\n\n').map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Read
