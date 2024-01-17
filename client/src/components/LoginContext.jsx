import { createContext, useState } from 'react'
import { doesTokenExist } from '../utils/helpers/common'

export const loginContext = createContext()

export const LoginProvider = (props) => {

  const [ loggedIn, setLoggedIn ] = useState(false)

  const val = {
    loggedIn,
    setLoggedIn
  }

  useState(() => {
    function checkStateOnRefresh(){
      const data = doesTokenExist()
      setLoggedIn(data)
    }
    checkStateOnRefresh()
  }, [])

  return (
    <loginContext.Provider value={val}>
      {props.children}
    </loginContext.Provider>
  )
}