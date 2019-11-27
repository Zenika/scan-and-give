import React, { useState } from 'react'
import cn from 'classnames'

import { Modal } from 'components'

//import './DeleteModal.scss'

const DeleteModal = ({ active, type, onClose, onConfirm, loading }) => {
  const [txt, setText] = useState('')

  return (
    <Modal active={active} onClose={!loading ? onClose : undefined}>
      <Modal.Title onClose={!loading ? onClose : undefined}>
        Are you sure you want to delete this {type}?
      </Modal.Title>
      <Modal.Body>
        <p>
          All data associated with this {type} will be erased. <b>This is irreversible.</b>
        </p>
        <br />
        <p>If you are sure about what you are doing, type "delete" in the following input:</p>
        <br />
        <div className="field">
          <div className="control">
            <input
              className={cn('input', { 'is-warning': txt === 'delete' })}
              type="text"
              value={txt}
              onChange={e => setText(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="is-pulled-right">
          <button className="button " onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={cn('button is-danger', { 'is-loading': loading })}
            onClick={onConfirm}
            disabled={loading || txt !== 'delete'}
          >
            Delete {type}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
