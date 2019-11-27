import React, { useState, useEffect } from 'react'
import objectHash from 'object-hash'

import { Modal } from 'components'

import QrScanner from './QrScanner'

import './DonationModal.scss'

const DonationModal = ({ active, onClose, onSuccess, charities }) => {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [charity, setCharity] = useState(charities.length > 0 ? charities[0].charity.id : '')

  useEffect(() => {
    if (text === '') return setHash('')
    setHash(objectHash(text))
  }, [text])

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title onClose={onClose}>Manually create a donation</Modal.Title>
      <Modal.Body>
        <div className="donation-modal-content">
          <label className="label" style={{ margin: 'auto' }}>
            Scan QR code
          </label>
          {active && <QrScanner onResult={setText} />}
          <textarea
            className="textarea"
            placeholder="Content of the QR Code"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="field">
            <label className="label">Charity</label>
            <div className="select">
              <select value={charity} onChange={e => setCharity(e.target.value)}>
                {charities.map(charity => (
                  <option key={charity.charity.id} value={charity.charity.id}>
                    {charity.charity.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Hash</label>
            <input type="input" className="input" readOnly={true} value={hash} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="button is-success"
          onClick={() => {
            setText('')
            onSuccess({ hash, charity })
            onClose()
          }}
          disabled={!hash || !charity}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DonationModal
