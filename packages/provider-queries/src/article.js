import gql from "graphql-tag";

export default gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      commentCount
      commentsEnabled
      content
      flags
      keywords
      leadAsset {
        ... on Video {
          brightcoveAccountId
          brightcovePolicyKey
          brightcoveVideoId
          posterImage {
            ...imageProps
          }
          type: __typename
        }
        ... on Image {
          type: __typename
          ...imageProps
        }
      }
      relatedArticleSlice {
        ... on StandardSlice {
          sliceName: __typename
          items {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
        }
        ... on LeadOneAndTwoSlice {
          sliceName: __typename
          lead {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
          support1 {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
          support2 {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
        }
        ... on OpinionOneAndTwoSlice {
          sliceName: __typename
          opinion {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
          support1 {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
          support2 {
            ...leadAssetProps
            article {
              ...relatedProps
            }
          }
        }
      }
      standfirst
      topics(maxCount: 5) {
        name
        slug
      }
      ...articleProps
    }
  }

  fragment imageProps on Image {
    caption
    credits
    crop(ratio: "16:9") {
      ratio
      url
    }
    id
    title
  }

  fragment videoProps on Video {
    brightcoveAccountId
    brightcovePolicyKey
    brightcoveVideoId
    posterImage {
      ...imageProps
    }
  }

  fragment leadAssetProps on Tile {
    leadAsset {
      ... on Video {
        ...videoProps
        type: __typename
      }
      ... on Image {
        type: __typename
        ...imageProps
      }
    }
  }

  fragment articleProps on Article {
    byline
    headline
    id
    label
    publicationName
    publishedTime
    section
    shortHeadline
    shortIdentifier
    slug
    url
  }

  fragment relatedProps on Article {
    leadAsset {
      ... on Image {
        crop169: crop(ratio: "16:9") {
          url
        }
        crop32: crop(ratio: "3:2") {
          url
        }
        id
        title
      }
      ... on Video {
        posterImage {
          crop169: crop(ratio: "16:9") {
            url
          }
          crop32: crop(ratio: "3:2") {
            url
          }
          id
          title
        }
      }
    }
    ...articleProps
    ...summaries
  }

  fragment summaries on Article {
    summary125: summary(maxCharCount: 125)
  }
`;
