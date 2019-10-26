import React, { useContext } from 'react'

import { Modal } from 'components'
import { BASE_FUNCTIONS_URL, UserContext } from 'services'

const ApiModal = ({ active, onClose, event }) => {
  const { user } = useContext(UserContext)

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title onClose={onClose}>API endpoints</Modal.Title>
      <Modal.Body>
        <div className="field">
          <label className="label">GET Event</label>
          <div className="control">
            <input
              className="input is-small"
              type="text"
              placeholder="Small input"
              readOnly={true}
              value={`${BASE_FUNCTIONS_URL}/live/${user.uid}/${event.id}`}
            />
          </div>
        </div>
        <hr />
        <div className="field">
          <label className="label">POST Donations</label>
          <div className="control">
            <input
              className="input is-small"
              type="text"
              placeholder="Small input"
              readOnly={true}
              value={`${BASE_FUNCTIONS_URL}/live/${user.uid}/${event.id}/donations`}
            />
          </div>
          <small>Body</small>
          <div className="content">
            <pre style={{ fontSize: '12px', padding: '0.5em 1em' }}>
              <code>
                {`{
  "donations": [
    {
      "hash": "42702ec3c56559d1069093842f1aa8a6247b6b20",
      "charity": "vmKD80AQsoFxXRqzqWU1",
      "date": 1572446399000
    },
    ...
  ]
}`}
              </code>
            </pre>
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

export default ApiModal
