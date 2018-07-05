import React from "react";
import { Dimensions, View, WebView } from "react-native";

export default function Interactive(props) {
  return (
      <View style={{ height: props.height }}>
        <WebView
          // Uses the following (go through the readme): https://drive.google.com/file/d/1jiAdKbQ7CBFVtYZFmffBMPWWgdOR1IcU/view?usp=sharing
          // URI is just local for now. CORS issues need to be resolved
          source={{
            uri:
              "http://localhost:8080/components/times-qwiz-rounds/"
          }}
        />
      </View>
  );
}

