import React, { useState } from 'react'
import cn from 'classnames'
import copy from 'copy-to-clipboard'

import './CopyToClipboard.scss'

const CopyToClipboard = ({ children, content }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <div
      onClick={() => {
        setClicked(true)
        setTimeout(() => setClicked(false), 1000)
        copy(content)
      }}
      className={cn('copy-to-clipboard', { clicked })}
    >
      {children}
      <span className="copied" aria-hidden="true">
        Copied
      </span>
    </div>
  )
}

export default CopyToClipboard
