import React, { useReducer, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import { space, SpaceProps } from "styled-system";
import Section from "./primitives/section";
import Border from "./knobs/border";
import Space from "./knobs/space";
import Dimension from "./knobs/dimension";
import Apperance from "./knobs/apperance";

const Container = styled.div<SpaceProps>`
  ${space}
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, {});

  const updateProperty = (prop: string, value: any) =>
    dispatch({
      type: "addProperty",
      payload: {
        prop,
        value
      }
    });

  useEffect(() => {
    window.addEventListener("message", message => {
      dispatch({
        type: "reset",
        payload: message.data
      });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container p="2">
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
      </Container>
    </ThemeProvider>
  );
}
