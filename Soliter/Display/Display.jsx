import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  View,
  Animated,
  SafeAreaView,
  PanResponder,
  Button
} from 'react-native'
import styles from './styles'
import { GameProvider, useGame } from '../GameContext'

const length = 5

const Piece = (props) => {
  const {
    setPieces,
    pieces,
    setViewValues,
    dropZoneValues,
    setDropZoneValues
  } = useGame()
  const [view, setView] = useState(null)
  const [location, setLocation] = useState(null)
  const id = Math.random()

  const callback = ({ pageX, pageY, width, height }) => {
    pieces[id] = { x: pageX + width / 2, y: pageY + height / 2 }
    setPieces(pieces)
  }

  const pan = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    // console.log('effect', pieces)
    setViewValues(view, callback)
  }, [pan.x, pan.y])

  const onMoveShouldSetPanResponder = () => true

  const onPanResponderGrant = () => {
    pan.setOffset({
      x: pan.x._value,
      y: pan.y._value
    })
  }

  const isHovering = ({ moveX, moveY, x, y }) =>
    moveX > x[0] && moveX < x[1] && moveY > y[0] && moveY < y[1]

  const onPanResponderRelease = (e, gesture) => {
    const { moveX, moveY } = gesture
    let hovering
    let x, y
    let key
    Object.entries(dropZoneValues).some(([curKey, value]) => {
      key = curKey
      x = value.x
      y = value.y
      hovering = isHovering({ moveY, moveX, x, y })
      return hovering
    })

    if (hovering) {
      const newOffset = {
        x: x[0] + (x[1] - x[0]) / 2,
        y: y[0] + (y[1] - y[0]) / 2
      }

      const newDropZoneValues = { ...dropZoneValues }
      newDropZoneValues[key] = { ...newDropZoneValues[key], hovered: false }
      setDropZoneValues(newDropZoneValues)

      // const newOffset = {
      //   x: 1,
      //   y: 1
      // }

      // console.log('newOffset', newOffset)

      pan.setOffset(newOffset)
    } else {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start()
    }

    // pan.flattenOffset()
  }

  const dropZonesArray = useMemo(() => Object.entries(dropZoneValues), [
    dropZoneValues
  ])

  // TODO add check if piece is above here
  const listener = (e, gesture) => {
    const { moveX, moveY } = gesture

    // console.log(e, gesture)
    // const hoveredKey
    // console.log('dropZonesArray', dropZonesArray)
    // console.log('dropZoneValues', dropZoneValues)
    Object.entries(dropZoneValues).some(([key, value]) => {
      const { x, y } = value
      const res = isHovering({ moveY, moveX, x, y })
      if (res) {
        const newDropZoneValues = { ...dropZoneValues }
        newDropZoneValues[key] = { ...dropZoneValues[key], hovered: true }
        setDropZoneValues(newDropZoneValues)
        // console.log({ moveX, moveY, x, y })
        console.log('res', res)
      }
      return res
    })
  }

  const onPanResponderMove = Animated.event([null, { dx: pan.x, dy: pan.y }], {
    useNativeDriver: false,
    listener
  })

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onPanResponderGrant,
      onPanResponderMove,
      onPanResponderRelease
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
  const tileId = `r${row}_c${col}`
  const { pieces } = useGame()
  const [view, setView] = useState(null)

  const callback = ({ pageX, pageY, width, height }) => {
    setDropZoneValues(() => {
      dropZoneValues[tileId] = {
        x: [pageX, pageX + width],
        y: [pageY, pageY + height],
        hovered: false
      }
      return dropZoneValues
    })
  }

  useEffect(() => {
    setViewValues(view, callback)
  }, [view])

  useEffect(() => {})

  return (
    <View style={styles.tileContainer} ref={(ref) => setView(ref)}>
      {/*<Button onPress={() => console.log(dropZoneValues[tileId])} title={'T'} />*/}
      {dropZoneValues[tileId] && dropZoneValues[tileId].hovered && (
        <View style={styles.hovered} />
      )}
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
