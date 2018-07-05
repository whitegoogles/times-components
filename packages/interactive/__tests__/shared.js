import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Interactive from "../interactive";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Interactive />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
