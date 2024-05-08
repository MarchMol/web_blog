import './Message.css'
import Button from '@components/Button.jsx'
import useMsg from '@hooks/useMsg'
import PropTypes from 'prop-types'
import React from 'react'

const Message = ({ children }) => {
  const { setIsModalOpen, isModalOpen, msg, isChoice, setExit } = useMsg()

  return (
        <>
            {isModalOpen
              ? (
                    <center>
                        {children}
                        <div className="disableMssg">
                            <div className="msgContainer">
                                <h2>{msg}</h2>
                                <div className="msgOptions">
                                    {isChoice
                                      ? (
                                            <>
                                                <Button text='Accept' onClick={() => {
                                                  setExit(1)
                                                }}/>
                                                <Button text='Cancel' onClick={() => {
                                                  setExit(2)
                                                }}
                                                />
                                            </>
                                        )
                                      : <Button text='Ok' onClick={() => setIsModalOpen(false)}/>
                                    }

                                </div>
                            </div>
                        </div>
                    </center>
                )
              : <>
                    {children}
                </>
            }
        </>
  )
}

Message.propTypes = {
  children: PropTypes.node.isRequired
}

export default Message
