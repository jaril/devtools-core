/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { mount } = require("enzyme");
const React = require("react");
const { createFactory } = React;
const ObjectInspector = createFactory(require("../../index"));
const ObjectClient = require("../__mocks__/object-client");

function generateDefaults(overrides) {
  return Object.assign({
    autoExpandDepth: 0,
    roots: [{
      path: "root",
      name: "root",
      contents: {value: 42}
    }],
    createObjectClient: grip => ObjectClient(grip)
  }, overrides);
}

function mounObjectInspector(props) {
  return mount(ObjectInspector(generateDefaults(props))).find("div.object-inspector");
}

describe("ObjectInspector - classnames", () => {
  it("has the expected class", () => {
    const wrapper = mounObjectInspector();
    expect(wrapper.hasClass("tree")).toBeTruthy();
    expect(wrapper.hasClass("inline")).toBeFalsy();
    expect(wrapper.hasClass("nowrap")).toBeFalsy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("has the nowrap class when disableWrap prop is true", () => {
    const wrapper = mounObjectInspector({
      disableWrap: true,
    });
    expect(wrapper.hasClass("nowrap")).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("has the inline class when inline prop is true", () => {
    const wrapper = mounObjectInspector({
      inline: true,
    });
    expect(wrapper.hasClass("inline")).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
