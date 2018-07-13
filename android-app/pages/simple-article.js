import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import Article from "@times-components/article";
import adTargetConfig from "./client/ad-targeting-config";

const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onAuthorPress,
  onLinkPress,
  onVideoPress,
  onTopicPress
} = NativeModules.ArticleEvents;

const platformAdConfig = {
  adUnit: "d.thetimes.co.uk",
  networkId: "25436805",
  testMode: "",
  sectionId: "",
  sectionName: "",
  articlePositionInSlot: 0,
  appVersion: "",
  operatingSystem: "",
  operatingSystemVersion: "",
  cookieEid: "",
  cookieAcsTnl: "",
  cookieIamTgt: "",
  deviceId: "",
  deviceIdHash: "",
  environment: "",
  isLoggedIn: true,
  platform: "mobile"
};

const ArticleDetailsPage = ({ article, error, isLoading }) => {
  const adConfig =
    isLoading || error ? {} : adTargetConfig(platformAdConfig, article);
    article.byline = JSON.parse(article.byline);
    article.content = JSON.parse(article.content);
    
  return (
    <Article
      adConfig={adConfig}
      analyticsStream={track}
      article={article}
      error={error}
      isLoading={isLoading}
      onAuthorPress={(event, extras) => onAuthorPress(extras.slug)}
      onLinkPress={(event, linkInfo) => {
        if (linkInfo.type === "article") {
          onArticlePress(linkInfo.url);
        } else if (linkInfo.type === "topic") {
          onTopicPress(linkInfo.url);
        } else {
          onLinkPress(linkInfo.url);
        }
      }}
      onRelatedArticlePress={(event, extras) => onArticlePress(extras.url)}
      onTopicPress={(event, extras) => onTopicPress(extras.slug)}
      onVideoPress={(event, info) => onVideoPress(info)}
    />
  );
};

ArticleDetailsPage.propTypes = {
  article: PropTypes.shape({}),
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string,
    networkError: PropTypes.shape({
      message: PropTypes.string
    })
  }),
  isLoading: PropTypes.bool
};

ArticleDetailsPage.defaultProps = {
  article: null,
  error: null,
  isLoading: false
};

export default ArticleDetailsPage;
