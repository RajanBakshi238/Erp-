import React from 'react'
import AuthProvider from './AuthContext/context'

const GlobalState = ({children}) => {
  return (
    <>
        <AuthProvider>{children}</AuthProvider>
    </>
  )
}




export default GlobalState