import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ text, onClick }) => {
  return (
        <button type="button" onClick={onClick}>
            <h3>{text}</h3>
        </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
