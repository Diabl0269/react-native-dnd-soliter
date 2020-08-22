import { Dimensions, StyleSheet } from "react-native";

const CIRCLE_RADIUS = 40;
const Window = Dimensions.get("window");
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    justifyContent: "center",
    height: 100,
    backgroundColor: "#11a443",
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    justifyContent: "center",
    backgroundColor: "#bc1a7b",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default styles;
