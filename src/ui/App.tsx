import React from "react";
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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container p="2">
        <Section label="Text">
          <TextStyles />
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
