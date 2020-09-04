import React, { useState, useContext, createContext, useMemo } from 'react'

const GameContext = createContext()
const GameProvider = (props) => {
  const [pieces, setPieces] = useState({})
  const [dropZoneValues, setDropZoneValues] = useState({})

  const setViewValues = (view, callback) =>
    view &&
    view.measure((x, y, width, height, pageX, pageY) => {
      callback({ x, y, width, height, pageX, pageY })
    })

  return (
    <GameContext.Provider
      value={{
        dropZoneValues,
        setDropZoneValues,
        pieces,
        setPieces,
        setViewValues
      }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)

export { useGame, GameProvider }
