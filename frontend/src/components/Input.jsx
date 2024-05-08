import PropTypes from 'prop-types'
import './Input.css'
import React from 'react'

const Input = ({ type, label, value, onChange, size, max }) => {
  return (

    <div className="field">
        <label>{label}:</label>
        {!(size === 'bigInput')
          ? (
        <input
        className={size}
        onChange={({ target: { value } }) => onChange(value)}
        value={value}
        type={type}
        maxLength={max}/>
            )
          : <textarea
         onChange={({ target: { value } }) => onChange(value)}
         value={value}
         />

        }

    </div>
  )
}

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.number
}

export default Input
