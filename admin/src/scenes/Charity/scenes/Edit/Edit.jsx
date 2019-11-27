import React, { useState, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { useFetch, useCachedFetch } from 'services'
import { Loading, DeleteModal, ImageModal } from 'components'

import './Edit.scss'

const Edit = ({ match, history }) => {
  const isEditing = !!match.params.id

  const [fetching, setFetching] = useState(isEditing)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [modal, setModal] = useState(null)

  const [charity, setCharity] = useState({
    name: '',
    image: '',
    description: '',
    notes: ''
  })

  const fetch = useFetch()
  const cachedFetch = useCachedFetch()

  useEffect(() => {
    if (isEditing) {
      cachedFetch(`charity/${match.params.id}`).onData(({ charity }) => {
        setCharity(charity)
        setFetching(false)
      })
    }
  }, [cachedFetch, isEditing, match.params.id])

  const createOrUpdate = useMemo(
    () => charity => {
      setLoading(true)
      fetch(isEditing ? `charity/${charity.id}` : 'charity/new', {
        method: 'POST',
        body: JSON.stringify(charity)
      })
        .then(r => r.json())
        .then(({ charity }) => {
          history.push(`/charity/${charity.id}`)
        })
    },
    [history, fetch, setLoading, isEditing]
  )

  const deleteCharity = useMemo(
    () => charity => {
      setDeleting(true)
      setLoading(true)
      fetch(`charity/${charity.id}`, {
        method: 'DELETE'
      }).then(() => {
        history.push('/charity/list')
      })
    },
    [fetch, history]
  )

  if (fetching) return <Loading />

  return (
    <>
      <div className="charity-edit">
        <div className="charity-actions">
          {!loading ? (
            <Link to={isEditing ? `/charity/${match.params.id}` : '/charity/list'}>
              <button className="button">Cancel</button>
            </Link>
          ) : (
            <button className="button" disabled={true}>
              Cancel
            </button>
          )}
          <button
            className={cn('button is-info', { 'is-loading': loading && !deleting })}
            onClick={() => createOrUpdate(charity)}
            disabled={!charity.name || loading}
          >
            <b>{isEditing ? 'Update' : 'Create'} charity</b>
          </button>
        </div>
        <div className="charity-meta">
          <div className={cn('charity-image', { 'is-disabled': loading })}>
            <img
              src={charity.image || 'https://via.placeholder.com/200'}
              alt="Logo of the charity"
            />
            <div className="edit-button" onClick={() => setModal('change_image_url')}>
              <i className="fas fa-image has-text-white fa-2x" />
            </div>
          </div>

          <div className="charity-name">
            <div className="field">
              <div className="control">
                <input
                  className="input is-large"
                  type="text"
                  placeholder="Name of the charity"
                  value={charity.name}
                  disabled={loading}
                  onChange={e => {
                    const name = e.target.value
                    setCharity(c => ({ ...c, name }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="charity-description">
          <div className="field">
            <label className="label">Description of the charity</label>
            <div className="control">
              <textarea
                className="textarea is-medium"
                placeholder="Description of the charity"
                rows="10"
                value={charity.description}
                disabled={loading}
                onChange={e => {
                  const description = e.target.value
                  setCharity(c => ({ ...c, description }))
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Personal notes <small>(won't appear in the live apps)</small>
            </label>
            <div className="control">
              <textarea
                className="textarea is-medium"
                placeholder="Personal notes"
                rows="10"
                value={charity.notes}
                disabled={loading}
                onChange={e => {
                  const notes = e.target.value
                  setCharity(c => ({ ...c, notes }))
                }}
              />
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="charity-actions">
            <button
              className={cn('button is-danger is-light', { 'is-loading': deleting })}
              onClick={() => setModal('delete_charity')}
              disabled={loading}
            >
              <b>Delete charity</b>
            </button>

            <button
              className={cn('button is-info', { 'is-loading': loading && !deleting })}
              onClick={() => createOrUpdate(charity)}
              disabled={!charity.name || loading}
            >
              <b>{isEditing ? 'Update' : 'Create'} charity</b>
            </button>
          </div>
        )}
      </div>
      <ImageModal
        active={modal === 'change_image_url'}
        type="charities"
        onClose={() => setModal(null)}
        onSuccess={image => setCharity(c => ({ ...c, image }))}
      />
      <DeleteModal
        type="charity"
        active={modal === 'delete_charity'}
        onClose={() => setModal(null)}
        onConfirm={() => deleteCharity(charity)}
        loading={deleting}
      />
    </>
  )
}

export default Edit
