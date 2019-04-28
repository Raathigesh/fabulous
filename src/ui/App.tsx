import React from "react";
import styled, { ThemeProvider } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import { space, SpaceProps } from "styled-system";
import Section from "./primitives/section";
import Border from "./knobs/border";

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
      </Container>
    </ThemeProvider>
  );
}
