import React, { useState, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'

import { formatMoney } from 'utils'
import { useFetch, useCachedFetch } from 'services'
import { Loading, ImageModal, DeleteModal } from 'components'

import { DatePicker, ColorPicker, DeviseSelect, MultiplierInput } from './components'

import './Edit.scss'

const Edit = ({ match, history }) => {
  const isEditing = !!match.params.id

  const [fetching, setFetching] = useState(isEditing)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [modal, setModal] = useState(null)

  const [more, setMore] = useState(false)

  const [event, setEvent] = useState({
    name: '',
    image: '',
    date: new Date(),
    devise: 'EUR',
    multiplier: 1,
    color: '#123456',
    customCss: ''
  })

  const fetch = useFetch()
  const cachedFetch = useCachedFetch()

  useEffect(() => {
    if (isEditing) {
      cachedFetch(`event/${match.params.id}`).onData(({ event }) => {
        event.date = fromUnixTime(event.date._seconds)
        setEvent(event)
        setFetching(false)
      })
    }
  }, [cachedFetch, isEditing, match.params.id])

  const createOrUpdate = useMemo(
    () => event => {
      setLoading(true)
      fetch(isEditing ? `event/${event.id}` : 'event/new', {
        method: 'POST',
        body: JSON.stringify(event)
      })
        .then(r => r.json())
        .then(({ event }) => {
          history.push(`/event/${event.id}`)
        })
    },
    [history, fetch, setLoading, isEditing]
  )

  const deleteEvent = useMemo(
    () => event => {
      setDeleting(true)
      setLoading(true)
      fetch(`event/${event.id}`, {
        method: 'DELETE'
      }).then(() => {
        history.push('/event/list')
      })
    },
    [fetch, history]
  )

  if (fetching) return <Loading />

  return (
    <>
      <div className="event-edit">
        <div className="event-actions">
          {!loading ? (
            <Link to={isEditing ? `/event/${match.params.id}` : '/event/list'}>
              <button className="button">Cancel</button>
            </Link>
          ) : (
            <button className="button" disabled={true}>
              Cancel
            </button>
          )}
          <button
            className={cn('button is-info', { 'is-loading': loading })}
            onClick={() => createOrUpdate(event)}
            disabled={!event.name || loading}
          >
            <b>{isEditing ? 'Update' : 'Create'} event</b>
          </button>
        </div>
        <div className="event-meta">
          <div className={cn('event-image', { 'is-disabled': loading })}>
            <img src={event.image || 'https://via.placeholder.com/200'} alt="Logo of the event" />
            <div className="edit-button" onClick={() => setModal('change_image_url')}>
              <i className="fas fa-image has-text-white fa-2x" />
            </div>
          </div>
          <div className="event-inputs">
            <div className="field event-name">
              <div className="control">
                <input
                  className="input is-large"
                  type="text"
                  placeholder="Name of the event"
                  value={event.name}
                  disabled={loading}
                  onChange={e => {
                    const name = e.target.value
                    setEvent(e => ({ ...e, name }))
                  }}
                />
              </div>
            </div>
            <div className="event-inputs-raw">
              <ColorPicker
                color={event.color}
                onChange={color => setEvent(e => ({ ...e, color }))}
                disabled={loading}
              />

              <DatePicker
                value={event.date}
                onDayChange={date => setEvent(e => ({ ...e, date }))}
                disabled={loading}
              />

              <DeviseSelect
                value={event.devise}
                onChange={devise => setEvent(e => ({ ...e, devise }))}
                disabled={loading}
              />

              <MultiplierInput
                value={event.multiplier}
                onChange={multiplier => setEvent(e => ({ ...e, multiplier }))}
                disabled={loading}
              />
            </div>
            <div>
              <p className="subtitle is-3 has-text-centered event-donation">
                1 donation = {formatMoney(event.multiplier, event.devise)}
              </p>
            </div>
          </div>
        </div>
        <div className="is-fullwidth has-text-centered" style={{ marginTop: '40px' }}>
          <button className="button is-light" onClick={() => setMore(m => !m)}>
            <span>More settings</span>
            {!more && (
              <span className="icon">
                <i className="fas fa-chevron-down" />
              </span>
            )}
            {more && (
              <span className="icon">
                <i className="fas fa-chevron-up" />
              </span>
            )}
          </button>
        </div>
        <div className={cn('event-more', { folded: !more })}>
          <div className="event-custom-css">
            <div className="field">
              <label className="label">Custom CSS</label>
              <div className="control">
                <textarea
                  className="textarea is-medium"
                  placeholder="Custom CSS"
                  rows="10"
                  value={event.customCss}
                  disabled={loading}
                  onChange={e => {
                    const customCss = e.target.value
                    setEvent(c => ({ ...c, customCss }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="event-actions">
            <button
              className={cn('button is-danger is-light', { 'is-loading': deleting })}
              onClick={() => setModal('delete_event')}
              disabled={loading}
            >
              <b>Delete event</b>
            </button>
            <button
              className={cn('button is-info', { 'is-loading': loading })}
              onClick={() => createOrUpdate(event)}
              disabled={!event.name || loading}
            >
              <b>{isEditing ? 'Update' : 'Create'} event</b>
            </button>
          </div>
        )}
      </div>
      <ImageModal
        active={modal === 'change_image_url'}
        type="events"
        onClose={() => setModal(null)}
        onSuccess={image => setEvent(e => ({ ...e, image }))}
      />
      <DeleteModal
        type="event"
        active={modal === 'delete_event'}
        onClose={() => setModal(null)}
        onConfirm={() => deleteEvent(event)}
        loading={deleting}
      />
    </>
  )
}

export default Edit
