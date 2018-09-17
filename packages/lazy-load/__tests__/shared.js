import React from "react";
import TestRenderer from "react-test-renderer";
import LazyLoad from "../src/lazy-load";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(<LazyLoad />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
