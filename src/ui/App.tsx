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

declare var acquireVsCodeApi: any;

const Container = styled.div<SpaceProps>`
  ${space}
`;

const GlobalStyles = createGlobalStyle`
body {
  background-color: #404040;
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
        <Flex p="2" flexDirection="column" backgroundColor="background">
          <Section label="Layout">
            <Layout />
          </Section>
          <Section label="Text">
            <TextStyles state={state} updateProp={updateProperty} />
          </Section>
          <Section label="Border">
            <Border />
          </Section>
          <Section label="Space">
            <Space />
          </Section>
          <Section label="Dimension">
            <Dimension />
          </Section>
          <Section label="Appearance">
            <Apperance />
          </Section>
        </Flex>
      </ThemeProvider>
    </Fragment>
  );
}
