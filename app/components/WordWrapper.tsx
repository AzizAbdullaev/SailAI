import { StyleSheet, Text } from "react-native";
import { DraxView } from "react-native-drax";

interface ColorBlockProps {
  name: string;
  active: boolean;
}

const WordWrapper = ({ name, active }: ColorBlockProps) => (
  <DraxView
    style={[
      styles.centeredContent,
      styles.textBlock,
      active && styles.dragging,
    ]}
    draggable={!active}
    hoverDraggingStyle={styles.hoverDragging}
    dragPayload={{ text: name }}
  >
    <Text>{name}</Text>
  </DraxView>
);

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  textBlock: {
    width: 80,
    height: 60,
    borderRadius: 10,
    margin: 8,
    backgroundColor: "#e3e3e3",
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "#8eb6f7",
    backgroundColor: "#fff",
    borderWidth: 2,
  },
});

export default WordWrapper;
