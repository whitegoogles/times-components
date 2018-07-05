import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  InteractiveBody: {
    ...sharedStyles.InteractiveBody,
    color: "red"
  }
});

export default webStyles;
