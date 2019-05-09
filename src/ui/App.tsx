import React, { useReducer, useEffect, Fragment } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import { space, SpaceProps } from "styled-system";
import Section from "./primitives/section";
import Border from "./knobs/border";
import Space from "./knobs/space";
import Dimension from "./knobs/dimension";
import Apperance from "./knobs/apperance";
import { Flex } from "rebass";
import Layout from "./knobs/layout";

import "react-tippy/dist/tippy.css";
import Theme from "./theme";
import Position from "./knobs/position";
import Background from "./knobs/background";
import BorderRadius from "./knobs/border-radius";

declare var acquireVsCodeApi: any;

const Container = styled.div<SpaceProps>`
  ${space}
`;

const GlobalStyles = createGlobalStyle`
body {
  background-color: ${Theme.colors.background};
  height: 100vh;
  padding: 0px;
}
`;

export interface State {
  [prop: string]: any;
}

export type UpdateProp = (prop: string, value: any) => void;

interface Action {
  type: string;
  payload: {
    prop: string;
    value: any;
  };
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "addProperty":
      return { ...state, [payload.prop]: payload.value };
    case "reset":
      return payload;
    default:
      throw new Error();
  }
}

const vscode = acquireVsCodeApi();

export default function App() {
  const [state, dispatch] = useReducer(reducer, {});

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
        type: "reset",
        payload: message.data
      });
    });
  }, []);

  return (
    <Fragment>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex p="3" flexDirection="column" backgroundColor="background">
          <Section label="Layout">
            <Layout state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Space">
            <Space state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Size">
            <Dimension state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Position">
            <Position state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Typography">
            <TextStyles state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Background">
            <Background state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Border">
            <Border state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Border radius">
            <BorderRadius state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Appearance">
            <Apperance state={state} updateProp={updateProperty} />
          </Section>
        </Flex>
      </ThemeProvider>
    </Fragment>
  );
}
