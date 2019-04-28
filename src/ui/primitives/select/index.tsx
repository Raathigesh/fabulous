import React from "react";
import Select from "react-select";
import styled from "styled-components";

const Container = styled.div``;

interface Props {
  width?: number;
  options: {
    value: any;
    label: string;
  }[];
}

export default function SingleSelect({ options, width }: Props) {
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided
    }),
    control: (provided: any) => ({
      ...provided,
      padding: 0,
      minHeight: "28px",
      height: "28px"
    }),
    singleValue: (provided: any, state: any) => {
      return { ...provided };
    }
  };
  return (
    <Container style={{ width }}>
      <Select options={options} styles={customStyles} />
    </Container>
  );
}
