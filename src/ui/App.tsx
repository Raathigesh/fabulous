import React, { useReducer, useEffect, Fragment } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import Section from "./primitives/section";
import Border from "./knobs/border";
import Space from "./knobs/space";
import Dimension from "./knobs/dimension";
import Apperance from "./knobs/apperance";
import { Flex } from "rebass";
import Layout from "./knobs/layout";
import Theme from "./theme";
import Position from "./knobs/position";
import Background from "./knobs/background";
import BorderRadius from "./knobs/border-radius";
import { reducer } from "./store";
import "react-tippy/dist/tippy.css";

declare var acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

const GlobalStyles = createGlobalStyle`
body {
  background-color: ${Theme.colors.background};
  height: 100vh;
  padding: 0px;
}
`;

const InitialState = {
  declarations: {}
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const updateProperty = (prop: string, value: any) => {
    dispatch({
      type: "addProperty",
      payload: {
        prop,
        value
      }
    });

    vscode.postMessage({
      prop,
      value
    });
  };

  useEffect(() => {
    window.addEventListener("message", message => {
      dispatch({
        type: "resetReclarations",
        payload: message.data
      });
    });
  }, []);

  const declarations = state.declarations || {};

  if (state.declarations === null) {
    return "Select a block";
  }

  return (
    <Fragment>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex p="3" flexDirection="column" backgroundColor="background">
          <Section label="Layout">
            <Layout declarations={declarations} updateProp={updateProperty} />
          </Section>
          <Section label="Space">
            <Space declarations={declarations} updateProp={updateProperty} />
          </Section>
          <Section label="Size">
            <Dimension
              declarations={declarations}
              updateProp={updateProperty}
            />
          </Section>
          <Section label="Position">
            <Position declarations={declarations} updateProp={updateProperty} />
          </Section>
          <Section label="Typography">
            <TextStyles
              declarations={declarations}
              updateProp={updateProperty}
            />
          </Section>
          <Section label="Background">
            <Background
              declarations={declarations}
              updateProp={updateProperty}
            />
          </Section>
          <Section label="Border">
            <Border declarations={declarations} updateProp={updateProperty} />
          </Section>
          <Section label="Border radius">
            <BorderRadius
              declarations={declarations}
              updateProp={updateProperty}
            />
          </Section>
          <Section label="Appearance">
            <Apperance
              declarations={declarations}
              updateProp={updateProperty}
            />
          </Section>
        </Flex>
      </ThemeProvider>
    </Fragment>
  );
}
