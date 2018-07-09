import React from "react";
import { Dimensions, View, WebView } from "react-native";
import PropTypes from "prop-types";

const htmlBuilder = ({attributes, element, source}) => {
  const elementAttributes = Object.keys(attributes).reduce((acc, key) => `${acc} ${key}=${attributes[key]}`, '');
  return `
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head>
  <body>
      <link rel="import" href="${source}" />
      <${element} ${elementAttributes}></${element}>
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
      </script>
  </body>
  </html>
  `
        };

export default function Interactive({attributes, element, height, source}) {
  return (
      <View style={{ height }}>
        <WebView
          source={{
            html: htmlBuilder({
              attributes,
              element,
              source
            })
          }}
        />
      </View>
  );
}

Interactive.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
}
