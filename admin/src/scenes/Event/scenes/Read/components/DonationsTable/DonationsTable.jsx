import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { fromSeconds } from 'utils'
import { useFetch } from 'services'
import { CopyToClipboard, Pagination } from 'components'

import DonationModal from '../DonationModal'

const MAX_DONATIONS_PER_PAGE = 10

const DonationsTable = ({ event, onChange }) => {
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetch = useFetch()

  const createDonation = useMemo(
    () => donation => {
      fetch(`event/${event.id}/charity/${donation.charity}/donation`, {
        method: 'POST',
        body: JSON.stringify({ hash: donation.hash })
      })
        .then(r => r.json())
        .then(({ error }) => {
          if (error) console.error(error)
          onChange()
        })
    },
    [fetch, onChange, event]
  )

  const deleteDonation = useMemo(
    () => donation => {
      fetch(`event/${event.id}/charity/${donation.charity.id}/donation`, {
        method: 'DELETE',
        body: JSON.stringify({ hash: donation.hash })
      })
        .then(r => r.json())
        .then(({ error }) => {
          if (error) console.error(error)
          onChange()
        })
    },
    [fetch, onChange, event]
  )

  return (
    <>
      <p
        className="subtitle is-5 has-text-centered"
        style={{ marginBottom: '1.2rem', padding: '0 20px 0 50px' }}
      >
        Donations
        <button
          className="button is-small is-primary is-outlined is-pulled-right"
          onClick={() => setModal(true)}
          data-tooltip="Add donation"
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </p>
      <table className="table is-bordered is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Hash</th>
            <th>Charity</th>
            <th>When</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {event.donations.length === 0 && (
            <tr>
              <td colSpan="4">
                <p className="has-text-centered">No donations yet...</p>
              </td>
            </tr>
          )}
          {event.donations
            .slice(
              (currentPage - 1) * MAX_DONATIONS_PER_PAGE,
              (currentPage - 1) * MAX_DONATIONS_PER_PAGE + MAX_DONATIONS_PER_PAGE
            )
            .map(([hash, { charity: charRaw, date }]) => {
              const charityId = charRaw._path.segments.slice(-1)[0]
              const charity = event.charities.find(char => char.charity.id === charityId).charity

              return (
                <tr key={hash}>
                  <td>
                    <CopyToClipboard content={hash}>
                      {hash.substr(0, 6)}&#8203;...&#8203;{hash.substr(-6)}
                    </CopyToClipboard>
                  </td>
                  <td>
                    <Link to={`/charity/${charity.id}`}>{charity.name}</Link>
                  </td>
                  <td>{formatDistanceToNow(fromSeconds(date), { addSuffix: true })}</td>
                  <td style={{ width: '50px' }}>
                    <button
                      className="button is-small is-danger"
                      onClick={() =>
                        window.confirm('Are you sure?') && deleteDonation({ hash, charity })
                      }
                    >
                      <span className="icon is-small">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <Pagination
        nbPages={Math.ceil(event.donations.length / MAX_DONATIONS_PER_PAGE)}
        current={currentPage}
        onPageSelected={setCurrentPage}
      />
      <DonationModal
        active={modal}
        onClose={() => setModal(false)}
        onSuccess={createDonation}
        charities={event.charities}
      />
    </>
  )
}

export default DonationsTable
