import './Icon.css'
import PropTypes from 'prop-types'
import React from 'react'

function Icon ({ type, onClick, enabled }) {
  return (
        <div className={enabled ? ('iconContainer') : 'disabledIcon'} onClick={onClick}>
            <div className={type}></div>
        </div>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Icon
