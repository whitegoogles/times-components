import React from "react";
import mockDate from "mockdate";
import RelatedArticles from "../src/related-articles";
import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article";
import { createRelatedArticlesProps, testSummary } from "./shared-util";

const leadAndTwo1ArticleFixtureData = leadAndTwo1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  label: "test label",
  shortHeadline: "Test Short Headline",
  section: "focus",
  summary125: testSummary(125),
  summary160: testSummary(160)
}).data;

export default renderComponent => {
  const realIntl = Intl;

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockDate.reset();
    global.Intl = realIntl;
  });

  it("default styles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo1ArticleFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot();
  });
};
