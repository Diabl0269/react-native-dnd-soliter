import React, { useState, useRef, useEffect } from 'react'
import { View, Animated, SafeAreaView, PanResponder } from 'react-native'
import styles from './styles'
import { GameProvider, useGame } from '../GameContext'

const length = 5

const Piece = (props) => {
  const { setPieces, pieces, setViewValues } = useGame()
  const [view, setView] = useState(null)
  const [location, setLocation] = useState(null)
  const id = Math.random()

  const callback = ({ pageX, pageY, width, height }) => {
    pieces[id] = { x: pageX + width / 2, y: pageY + height / 2 }
    setPieces(pieces)
  }

  const pan = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    console.log('effect', pieces)
    setViewValues(view, callback)
  }, [pan.x, pan.y])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('grant', pan)
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        })
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset()
      }
    })
  ).current

  return (
    <Animated.View
      ref={(ref) => setView(ref)}
      style={[{ transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.piece} />
    </Animated.View>
  )
}

const Tile = (props) => {
  const { dropZoneValues, setDropZoneValues, setViewValues } = useGame()
  const { row, col } = props

  const [view, setView] = useState(null)

  const callback = ({ pageX, pageY, width, height }) => {
    setDropZoneValues(() => {
      dropZoneValues[`r${row}_c${col}`] = {
        x: [pageX, pageX + width],
        y: [pageY, pageY + height]
      }
      return dropZoneValues
    })
  }

  useEffect(() => {
    setViewValues(view, callback)
  }, [view])

  // const [hovered, setHovered] = useState(true);

  return (
    <View style={styles.tileContainer} ref={(ref) => setView(ref)}>
      {/*{hovered && <View style={styles.hovered} />}*/}
    </View>
  )
}

const tilesArr = [...Array(length)].map(() => Array(length).fill(Tile))

const Display = () => {
  return (
    <SafeAreaView style={styles.displayContainer}>
      <GameProvider>
        <View style={styles.gameContainer}>
          <View style={styles.boardContainer}>
            {tilesArr.map((tilesRow, i) => (
              <View style={styles.rowContainer} key={i}>
                {tilesRow.map((CurTile, j) => (
                  <CurTile key={`j${j}`} row={i} col={j} />
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.arsenalContainer}>
          <Piece />
        </View>
      </GameProvider>
    </SafeAreaView>
  )
}

export default Display

//Should find a way to check if a piece's location is near a tile
//hovered = onTile(pieceLocation)
