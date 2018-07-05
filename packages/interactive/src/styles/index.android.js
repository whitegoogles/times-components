import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  InteractiveBody: {
    ...sharedStyles.InteractiveBody,
    color: "green"
  }
});

export default webStyles;
