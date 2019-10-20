import React, { useRef, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import objectHash from 'object-hash'

import QrScanner from 'qr-scanner'

import AssoContext from './AssoContext'
import api from './api'

QrScanner.WORKER_PATH = '/lib/qr-scanner-worker.min.js'

const Scan = ({
  match: {
    params: { id }
  }
}) => {
  const associations = useContext(AssoContext)

  const association = associations.find(a => a.id === Number(id))

  const videoRef = useRef(null)

  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (videoRef.current) {
      // I need to manually change "environment" to "user" in the package
      const scanner = new QrScanner(videoRef.current, result => {
        if (!result.startsWith('BEGIN:VCARD')) return

        scanner.destroy()
        api.addDon(id, objectHash(result)).then(resp => {
          if (resp.status === 200) {
            setModal('success')
          } else if (resp.status === 403) {
            setModal('error')
          }
        })
      })
      scanner.start()
    }
  }, [videoRef])

  if (!association) return null

  return (
    <div id="scan">
      <video ref={videoRef} />
      <Link to={`/association/${id}`} className="retour-btn">
        <div>
          Retour{' '}
          <span role="img" aria-label="finger pointing left">
            👈
          </span>
        </div>
      </Link>
      <div className="modal" style={{ display: modal === 'success' ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="title">
            Merci pour eux !{' '}
            <span role="img" aria-label="hands praying">
              🙏
            </span>
          </span>
          <div className="image-wrapper">
            <img src={association.image} alt={`Logo of ${association.nom}`} />
          </div>
          <div className="actions">
            <Link to={`/`} style={{ backgroundColor: 'lightgray' }}>
              <span>Accueil</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="modal" style={{ display: modal === 'error' ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="title">
            Vous avez déjà utilisé votre badge !{' '}
            <span role="img" aria-label="confused">
              😕
            </span>
          </span>
          <div className="actions">
            <Link to={`/association/${id}`} style={{ backgroundColor: 'lightgray' }}>
              <span>Retour</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scan
