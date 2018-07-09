import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

export default (withPageState, renderComponent) => {
  it("renders inner component with page 1", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const props = {
      page: 1
    };

    const output = renderComponent(<PageChanger {...props} />);

    expect(output).toMatchSnapshot("1. renders inner component with page 1");
  });

  it("renders inner component with new props", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const props = {
      foo: "not bar",
      page: 1
    };

    const wrapper = shallow(<PageChanger {...props} />);

    wrapper.setProps({ foo: "bar" });
    wrapper.update();

    expect(wrapper.state().foo).toEqual("bar");
    expect(wrapper.state().page).toEqual(1);
  });

  it("renders inner component with prev page", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const props = {
      page: 2
    };

    const wrapper = shallow(<PageChanger {...props} />);
    wrapper.instance().handleChangePage({ preventDefault: () => {} }, 1);
    wrapper.update();

    expect(wrapper.state().page).toEqual(1);
  });

  it("renders inner component with next page", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const props = {
      page: 2
    };

    const wrapper = shallow(<PageChanger {...props} />);
    wrapper.instance().handleChangePage({ preventDefault: () => {} }, 3);
    wrapper.update();

    expect(wrapper.state().page).toEqual(3);
  });
};