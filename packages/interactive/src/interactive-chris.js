import React, { Component } from "react";
import { Platform, ScrollView, Text, View, WebView } from "react-native";

const postMessageBugWorkaround = Platform.select({
  // https://github.com/facebook/react-native/issues/10865
  ios: {
    injectedJavaScript:
      "window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
  }
});


class Interactive extends Component {
  constructor(){
    super();
    this.state = {
      height: 400
    }
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(message) {
    console.log(message.nativeEvent.data)
    const heightReceived = parseInt(message.nativeEvent.data);
    const height = heightReceived;
    this.setState({height});
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
      {/* <View style={{height: this.state.height}}> */}
        <WebView
          style={{height: this.state.height}}
          ref={webview => { this.webview = webview; }}
          onMessage={this.onMessage}
          source={{uri: 'https://cwfiyvo20d.execute-api.eu-west-1.amazonaws.com/dev/component/d970af23-46e2-4c33-af0b-90cb20a63958'}}
          onLoad={() => {
            console.log("FINISHED LOADING")
            this.webview.postMessage("thetimes.co.uk", "*")
          }}
          {...postMessageBugWorkaround}
        />
      {/* </View> */}
    </ScrollView>
    )
  }
}

export default Interactive;
