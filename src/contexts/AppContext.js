import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => {
  const app = useContext(AppContext)

  return app
}

export const AppProvider = ({ children }) => {
    const [checked, setChecked] = useState([]);
    const state = { checked, setChecked };

  return (<AppContext.Provider value={state}>{children}</AppContext.Provider>);
}
