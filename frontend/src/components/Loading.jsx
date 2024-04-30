import { useState, useEffect } from "react";
import './Loading.css'

const Loading = ({ isLoading, children }) => {
  return (
    <center>
      {isLoading ?
        (
          <>
            {children}
            <div className="disableLoading">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-chargement-jaune.png" alt="Cargando Contenido" className="loading" />
            </div>
            
          </>)
          :(
            <>
            {children}
            </>
            
          )
          }
    </center>
  );
}

export default Loading