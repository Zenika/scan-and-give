import React from 'react'

const MultiplierInput = ({ value, onChange, disabled }) => (
  <div className="field" style={{ maxWidth: '200px' }}>
    <label className="label">Multiplier</label>
    <p className="control has-icons-left">
      <input
        className="input is-medium"
        type="number"
        placeholder="Multiplier"
        value={value}
        onChange={e => {
          const val = e.target.value
          if (val === '') {
            onChange('')
          } else if (!isNaN(Number(val)) && Number(val) > 0) {
            onChange(Number(val))
          }
        }}
        disabled={disabled}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-balance-scale" />
      </span>
    </p>
  </div>
)

export default MultiplierInput
