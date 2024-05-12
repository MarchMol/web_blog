import './Loading.css'
import PropTypes from 'prop-types'
import React from 'react'

const Loading = ({ isLoading, children }) => {
  return (
    <div className='loadingContainer'>
      {isLoading
        ? (
          <>
            {children}
            <div className="disableLoading">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-chargement-jaune.png" alt="Cargando Contenido" className="loading" />
            </div>

          </>)
        : (
            <>
            {children}
            </>
          )
          }
    </div>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Loading
