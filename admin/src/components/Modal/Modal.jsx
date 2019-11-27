import React from 'react'
import cn from 'classnames'

const Modal = ({ active, children, className, onClose }) => (
  <div className={cn('modal', className, { 'is-active': active })}>
    <div className="modal-background" onClick={onClose}></div>
    <div className="modal-card">{children}</div>
  </div>
)

Modal.Title = ({ children, onClose }) => (
  <header className="modal-card-head">
    <p className="modal-card-title">{children}</p>
    <button className="delete" aria-label="close" onClick={onClose}></button>
  </header>
)

Modal.Body = ({ children }) => <section className="modal-card-body">{children}</section>

Modal.Footer = ({ children }) => (
  <footer className="modal-card-foot" style={{ justifyContent: 'flex-end' }}>
    {children}
  </footer>
)

export default Modal
