import React, { useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'
import debounce from 'lodash/debounce'

QrScanner.WORKER_PATH = '/lib/qr-scanner-worker.min.js'

const Scanner = ({ onResult }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      const scanner = new QrScanner(videoRef.current, debounce(result => onResult(result)))
      scanner.start()

      return () => scanner.destroy()
    }
  }, [videoRef, onResult])

  return <video ref={videoRef} style={{ minHeight: '250px' }} />
}

export default Scanner
