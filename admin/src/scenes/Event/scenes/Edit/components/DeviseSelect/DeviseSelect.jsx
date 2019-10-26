import React from 'react'

import { mainDevises, devises } from 'utils'

const DeviseSelect = ({ value, onChange, disabled }) => (
  <div className="field">
    <label className="label">Devise</label>
    <div className="select is-medium">
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
        {mainDevises.map(code => (
          <option key={code} value={code}>
            {code} ({devises[code]})
          </option>
        ))}
        <option disabled>───</option>
        {Object.entries(devises)
          .filter(([code]) => !mainDevises.includes(code))
          .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
          .map(([code, symbol]) => (
            <option key={code} value={code}>
              {code} ({symbol})
            </option>
          ))}
      </select>
    </div>
  </div>
)

export default DeviseSelect
