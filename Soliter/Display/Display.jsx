import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  SafeAreaView,
  PanResponder,
  Button,
} from "react-native";
import styles from "./styles";

const length = 5;

const Piece = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [view, setView] = useState(null);
  const [location, setLocation] = useState(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.piece} />
    </Animated.View>
  );
};

const Tile = (props) => {
  const { row, col, dropZoneValues, setDropZoneValues } = props;
  const [view, setView] = useState(null);

  useEffect(() => {
    view &&
      view.measure((x, y, width, height, pageX, pageY) => {
        setDropZoneValues(() => {
          dropZoneValues[`r${row}_c${col}`] = {
            x: [pageX, pageX + width],
            y: [pageY, pageY + height],
          };
          return dropZoneValues;
        });
      });
  }, [view]);

  // const [hovered, setHovered] = useState(true);

  return (
    <View style={styles.tileContainer} ref={(ref) => setView(ref)}>
      {/*{hovered && <View style={styles.hovered} />}*/}
    </View>
  );
};

const tilesArr = [...Array(length)].map(() => Array(length).fill(Tile));

const Display = () => {
  const [dropZoneValues, setDropZoneValues] = useState({});

  return (
    <SafeAreaView style={styles.displayContainer}>
      <View style={styles.gameContainer}>
        <View style={styles.boardContainer}>
          {tilesArr.map((tilesRow, i) => (
            <View style={styles.rowContainer} key={i}>
              {tilesRow.map((CurTile, j) => (
                <CurTile
                  key={`j${j}`}
                  row={i}
                  col={j}
                  dropZoneValues={dropZoneValues}
                  setDropZoneValues={setDropZoneValues}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <Button onPress={() => console.log(dropZoneValues)} title="hello world" />

      <View style={styles.arsenalContainer}>
        <Piece />
      </View>
    </SafeAreaView>
  );
};

export default Display;

//Should find a way to check if a piece's location is near a tile
//hovered = onTile(pieceLocation)
