import React, { useState, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { formatMoney } from 'utils'
import { useFetch, useCachedFetch } from 'services'

import AutoComplete from '../AutoComplete'

import './CharitiesTable.scss'

const CharitiesTable = ({ event, onChange }) => {
  const [formOpened, setFormOpened] = useState(false)

  const [charities, setCharities] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState(null)

  const [linking, setLinking] = useState(false)
  const [unlinking, setUnlinking] = useState(false)

  const fetch = useFetch()
  const cachedFetch = useCachedFetch()

  useEffect(() => {
    cachedFetch('charity/list').onData(({ error, charities }) => {
      if (error) return console.error(error)

      charities.sort((a, b) => a.name.localeCompare(b.name))

      setCharities(charities)
    })
  }, [cachedFetch])

  useEffect(() => {
    const alreadyLinked = event.charities.map(c => c.charity.id)
    const suggestions = charities.filter(c => !alreadyLinked.includes(c.id))
    setSuggestions(suggestions)
  }, [charities, event.charities])

  const linkCharity = useMemo(
    () => () => {
      setLinking(true)
      fetch(`event/${event.id}/charity/link`, {
        method: 'POST',
        body: JSON.stringify({ charity: selected.id })
      })
        .then(r => r.json())
        .then(() => {
          setLinking(false)
          setFormOpened(false)
          onChange()
        })
    },
    [fetch, event, selected, onChange]
  )

  const unlinkCharity = useMemo(
    () => charity => {
      setUnlinking(charity.id)
      fetch(`event/${event.id}/charity/${charity.id}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(({ error }) => {
          if (error) console.log(error)
          setUnlinking(false)
          onChange()
        })
    },
    [fetch, event, onChange]
  )

  return (
    <>
      <p className="subtitle is-5 has-text-centered">Charities</p>
      <table className="table is-bordered is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Donations</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {event.charities.map(({ charity, count }) => (
            <tr key={charity.id}>
              <td>
                <Link to={`/charity/${charity.id}`}>{charity.name}</Link>
              </td>
              <td className="has-text-right">{count}</td>
              <th className="has-text-right">
                {formatMoney(count * event.multiplier, event.devise)}
              </th>
              <td style={{ width: '50px' }}>
                <div
                  data-tooltip={
                    count > 0 ? 'Delete all donations to this charity first' : undefined
                  }
                >
                  <button
                    className={cn('button is-small is-danger', {
                      'is-loading': unlinking === charity.id
                    })}
                    disabled={count > 0}
                    onClick={() => unlinkCharity(charity)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus"></i>
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr className="event-new-charity">
            {formOpened && (
              <>
                <td colSpan="3">
                  <div className="event-charity-autocomplete">
                    <AutoComplete items={suggestions} onSelected={setSelected} />
                    <div
                      className={cn('button is-white', { 'is-loading': linking })}
                      disabled={!selected}
                      onClick={linkCharity}
                    >
                      <span className="icon has-text-success">
                        <i className="fas fa-plus-circle fa-lg" />
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <div className="button is-white is-small" onClick={() => setFormOpened(false)}>
                    <span className="icon has-text-grey-dark">
                      <i className="fas fa-times fa-lg" />
                    </span>
                  </div>
                </td>
              </>
            )}
            {!formOpened && (
              <td colSpan="4">
                <div className="is-fullwidth has-text-centered">
                  <button
                    className="button is-primary is-small"
                    onClick={() => setFormOpened(true)}
                  >
                    Add a charity
                  </button>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default CharitiesTable
