import React, { useState, useContext } from 'react'
import * as firebase from 'firebase/app'
import FileUploader from 'react-firebase-file-uploader'

import { UserContext } from 'services'
import { Modal } from 'components'

import './ImageModal.scss'

const ImageModal = ({ active, type, onClose, onSuccess }) => {
  const [url, setUrl] = useState(null)
  const [progress, setProgress] = useState(-1)
  const [error, setError] = useState(null)

  const { user } = useContext(UserContext)

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title onClose={onClose}>Upload image</Modal.Title>
      <Modal.Body>
        {url && (
          <div className="update-image">
            <img src={url} alt="Uploaded" />
          </div>
        )}
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref(`${user.uid}/${type}`)}
          onUploadStart={() => {
            setProgress(0)
          }}
          onUploadError={error => {
            console.error(error)
            setError(error.message)
            setProgress(-1)
          }}
          onUploadSuccess={filename => {
            firebase
              .storage()
              .ref(`${user.uid}/${type}`)
              .child(filename)
              .getDownloadURL()
              .then(url => {
                setUrl(url)
                setProgress(-1)
              })
          }}
          onProgress={progress => setProgress(progress)}
          className="input"
          disabled={progress >= 0}
        />
        <small>
          <i>File size limit: 2Mo</i>
        </small>
        <br />
        <br />
        {progress >= 0 && (
          <progress className="progress is-primary" value={progress} max="100">
            {progress}%
          </progress>
        )}
        {error && <span className="has-text-danger">{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="button is-success"
          onClick={() => {
            onSuccess(url)
            onClose()
          }}
          disabled={!url}
        >
          Validate
        </button>
      </Modal.Footer>
    </Modal>
  )
}

/*const ImageModal = ({ active, value, onClose, onSuccess }) => {
  const [url, setUrl] = useState(value)
  const [debouncedUrl, setDebouncedUrl] = useState(value)

  const debouncedSetDebouncedUrl = useMemo(() => debounce(setDebouncedUrl, 500), [setDebouncedUrl])

  return (
    <Modal active={active} onClose={onClose}>
      <Modal.Title onClose={onClose}>Change image URL</Modal.Title>
      <Modal.Body>
        <div className="update-image">
          <div className="update-image-image">
            <img src={debouncedUrl} alt="Logo" />
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="https://..."
                value={url}
                onChange={e => {
                  setUrl(e.target.value)
                  debouncedSetDebouncedUrl(e.target.value)
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-link" />
              </span>
            </p>
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
            onSuccess(url)
            onClose()
          }}
          disabled={!url}
        >
          Save URL
        </button>
      </Modal.Footer>
    </Modal>
  )
}*/

export default ImageModal
