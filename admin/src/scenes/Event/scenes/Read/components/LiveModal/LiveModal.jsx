import React, { useContext } from 'react'
import QRCode from 'qrcode.react'

import { Modal, CopyToClipboard } from 'components'
import { UserContext } from 'services'

import './LiveModal.scss'

const LiveModal = ({ active, onClose, event }) => {
  const { user } = useContext(UserContext)

  const liveUrl = `https://live-scan-and-give.web.app/${user.uid}/${event.id}`

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title onClose={onClose}>Live Event</Modal.Title>
      <Modal.Body>
        <div className="live-event">
          <div className="direct-and-qr-code">
            <div className="direct">
              <b>Direct access</b>
              <div>
                <a
                  className="button is-large is-info"
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon is-medium" style={{ padding: '0 0 4px 5px' }}>
                    <i className="fas fa-external-link-alt" />
                  </span>
                </a>
              </div>
            </div>
            <div className="qr-code">
              <b>QR Code Access</b>
              <div>
                <QRCode value={liveUrl} />
              </div>
            </div>
          </div>
          <div className="public-url">
            <b>Public URL</b>
            <div>
              <input className="input is-small" type="text" readOnly={true} value={liveUrl} />
              <CopyToClipboard content={liveUrl}>
                <button className="button is-small is-primary">
                  <i className="far fa-clipboard fa-lg" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default LiveModal
