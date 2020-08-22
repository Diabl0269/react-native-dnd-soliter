import React, { useState } from "react";
import { View, Text, PanResponder, Animated } from "react-native";
import styles from "./styles";

const DropZone = () => {
  const pan = new Animated.ValueXY();
  const [showDraggable, setShowDraggable] = useState(true);
  const [dropZoneValues, setDropZoneValues] = useState(null);

  const appear = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      }
    ),
    onPanResponderRelease: (e, gesture) =>
      isDropZone(gesture)
        ? setShowDraggable(false)
        : Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start(),
  });

  const startAppear = () =>
    Animated.spring(appear, { toValue: 1, duration: 200 }).start();

  const isDropZone = (gesture) =>
    gesture.moveY > dropZoneValues.y &&
    gesture.moveY < dropZoneValues.y + dropZoneValues.height;

  const RenderDraggable = () =>
    showDraggable && (
      <View style={styles.draggableContainer}>
        <Animated.View
          onLayout={startAppear()}
          {...panResponder.panHandlers}
          style={[
            pan.getLayout(),
            { transform: [{ scale: appear }] },
            styles.circle,
          ]}
        >
          <Text style={styles.text}>Drag Me!</Text>
        </Animated.View>
      </View>
    );

  const adjustDropZoneValues = (e) => {
    console.log(e);
    setDropZoneValues(e.nativeEvent.layout);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone} onLayout={adjustDropZoneValues}>
        <Text style={styles.text}>Drop me here pazalusta 🤪</Text>
      </View>

      <RenderDraggable pan={pan} panResponder={panResponder} />
    </View>
  );
};

export default DropZone;
