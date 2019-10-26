import React from 'react'
import cn from 'classnames'

import Pagination from './Pagination'

import './DefaultPagination.scss'

const renderPage = ({ index, isCurrent, onClick }) => (
  <button
    className={cn('button is-small', { 'is-primary': isCurrent })}
    key={index}
    onClick={onClick}
  >
    {index}
  </button>
)

const renderEllipsis = ({ key }) => (
  <button className="button is-small is-white" key={key} disabled>
    ...
  </button>
)

const renderNav = ({ type, disabled, onClick }) => (
  <button
    className="button is-small is-white"
    key={type}
    icon={type === 'previous' ? 'chevron_left' : 'chevron_right'}
    disabled={disabled}
    onClick={onClick}
  >
    <span className="icon is-small">
      <i className={cn('fas', type === 'previous' ? 'fa-angle-left' : 'fa-angle-right')} />
    </span>
  </button>
)

const DefaultPagination = ({ nbPages, current, onPageSelected }) => (
  <Pagination
    nbPages={nbPages}
    current={current}
    onPageSelected={onPageSelected}
    renderPage={renderPage}
    renderEllipsis={renderEllipsis}
    renderNav={renderNav}
    className="pagination"
  />
)

export default DefaultPagination
