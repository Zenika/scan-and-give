import React from 'react'

const ColorPicker = ({ color, onChange, disabled }) => {
  return (
    <div className="field">
      <label className="label">Main color</label>
      <div className="control has-icons-left">
        <input
          className="input is-medium"
          type="text"
          placeholder="#123456"
          value={color}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        />
        <span className="icon is-small is-left">
          <div
            style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: color }}
          ></div>
        </span>
      </div>
    </div>
  )
}

export default ColorPicker
