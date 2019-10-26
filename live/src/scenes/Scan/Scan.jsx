import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import objectHash from 'object-hash'

import QrScanner from 'qr-scanner'

import { useEvent, useBaseUrl, useIntl } from 'services'

import './Scan.scss'

QrScanner.WORKER_PATH = '/lib/qr-scanner-worker.min.js'

const Scan = ({
  match: {
    params: { id }
  }
}) => {
  const { event, makeDonation } = useEvent()

  const videoRef = useRef(null)

  const [modal, setModal] = useState(null)

  const intl = useIntl(Scan)

  useEffect(() => {
    if (videoRef.current) {
      const scanner = new QrScanner(videoRef.current, result => {
        scanner.destroy()

        makeDonation(
          {
            hash: objectHash(result),
            charity: id,
            date: new Date().getTime()
          },
          () => setModal('success'),
          () => setModal('already_voted')
        )
      })
      scanner.start()

      return () => scanner.destroy()
    }
  }, [videoRef, id, makeDonation])

  const baseUrl = useBaseUrl()

  if (!event) return null

  const charity = event.charities.find(c => c.id === id)

  if (!charity) return null

  return (
    <div id="scan">
      <video ref={videoRef} />
      <Link to={baseUrl + `/charity/${id}`} className="retour-btn">
        <div>
          {intl('back')}{' '}
          <span role="img" aria-label="finger pointing left">
            👈
          </span>
        </div>
      </Link>
      <div className="modal" style={{ display: modal === 'success' ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="title">
            {intl('thanks')}{' '}
            <span role="img" aria-label="hands praying">
              🙏
            </span>
          </span>
          <div className="image-wrapper">
            <img src={charity.image} alt={`Logo of ${charity.nom}`} />
          </div>
          <div className="actions">
            <Link to={baseUrl} style={{ backgroundColor: 'lightgray' }}>
              <span>{intl('home')}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="modal" style={{ display: modal === 'already_voted' ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="title">
            {intl('already_used')}{' '}
            <span role="img" aria-label="confused">
              😕
            </span>
          </span>
          <div className="actions">
            <Link to={baseUrl + `/charity/${id}`} style={{ backgroundColor: 'lightgray' }}>
              <span>{intl('back')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Scan.translations = {
  fr: {
    back: 'Retour',
    thanks: 'Merci pour eux !',
    home: 'Accueil',
    already_used: 'Vous avez déjà utilisé votre badge !'
  },
  en: {
    back: 'Back',
    thanks: 'Thank you!',
    home: 'Home',
    already_used: 'You already used you badge!'
  }
}

export default Scan
