import React, { Component } from "react";
import { Button, Dimensions, Linking, Platform, View, WebView } from "react-native";
import PropTypes from "prop-types";

const htmlBuilder = ({attributes, element, source}) => {
  const elementAttributes = Object.keys(attributes).reduce((acc, key) => `${acc} ${key}=${attributes[key]}`, '');
  let id = 'iframe-wrapper';

  // Need a list of container ids for each interactive in order to figure out height.
  switch(element){
    case 'times-qwiz-rounds': id = 'qwiz-rounds'; break;
  }

  return `
<html>
  <head>
    <title>${element}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1.5.0/dist/ResizeObserver.min.js"></script>
  </head>
  <body>
      <link rel="import" href="https:${source}" />
      <${element} ${elementAttributes} id="interactive"></${element}>
      <script>
          (function () {
              var polyfillUrl =
                  'https://www.thetimes.co.uk/d/345/bower-components/webcomponentsjs/webcomponents-lite.min.js';
              var webComponentsSupported = ('registerElement' in document && 'import' in document.createElement(
                  'link') && 'content' in document.createElement('template'));
              var isPolyfilled = document.body.querySelector("script[src*='" + polyfillUrl + "']");
              if (!webComponentsSupported && !isPolyfilled) {
                  var script = document.createElement('script');
                  script.src = polyfillUrl;
                  document.body.appendChild(script);
              }
          })();

          window.document.addEventListener("message", function(data) {
            getHeight();
          });

          function getHeight() {
            var height = document.getElementById('${id}').offsetHeight;
            if(window.reactBridgePostMessage) {
              window.reactBridgePostMessage(height)
            } else {
              window.postMessage(height);
            }
          }

          var ro = new ResizeObserver( entries => {
            for (let entry of entries) {
              const cr = entry.contentRect;
              if(window.reactBridgePostMessage) {
                window.reactBridgePostMessage(cr.height);
              } else {
                window.postMessage(cr.height);
              }
            }
          });

          var observableElement = document.querySelector('#${id}');
          ro.observe(observableElement);

      </script>
  </body>
  </html>
  `
        };


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
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
  }

  openURLInBrowser(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  onMessage(data) {
    const heightReceived = parseInt(data.nativeEvent.data);
    const height = heightReceived + 20;
    this.setState({height});
  }

  handleNavigationStateChange(data) {
    if(!data.url.includes('data:text/html') && data.url.includes("http")){
      // Need to handle native routing when something is clicked.
      this.openURLInBrowser(data.url);
    }
  }

  render(){
    const { attributes, element, source } = this.props;

    return (
      <View style={{ height: this.state.height, marginBottom: 20 }}>
        <WebView
          ref={webview => { this.webview = webview; }}
          onMessage={this.onMessage.bind(this)}
          source={{
            html: htmlBuilder({
              attributes,
              element,
              source
            })
          }}
          onLoadEnd={() => this.webview.postMessage("Hello from RN")}
          onNavigationStateChange={this.handleNavigationStateChange}
          {...postMessageBugWorkaround}
        />
      </View>
  );
  }

}

Interactive.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
}

export default Interactive;
