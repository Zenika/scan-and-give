import React, { useState, useEffect } from 'react'

import './AutoComplete.scss'

const getValue = i => i.name

const AutoComplete = ({ items, onSelected }) => {
  const [value, setValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!value) {
      setSuggestions(items)
    } else {
      setSuggestions(
        items.filter(suggestion =>
          getValue(suggestion)
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      )
    }
  }, [value, items, onSelected])

  return (
    <div className="autocomplete field">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Charity name"
          value={value}
          onChange={e => {
            setValue(e.target.value)
            onSelected(null)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
      </div>
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map(suggestion => (
            <div
              key={suggestion.name}
              className="suggestion"
              onMouseDown={() => {
                setValue(getValue(suggestion))
                setShowSuggestions(false)
                onSelected(suggestion)
              }}
            >
              {getValue(suggestion)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AutoComplete
