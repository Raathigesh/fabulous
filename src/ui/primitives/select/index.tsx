import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { Flex } from "rebass";

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
      ...provided,
      height: "28px",
      color: "gray"
    }),
    control: (provided: any) => ({
      ...provided,
      padding: 0,
      minHeight: "28px",
      height: "28px"
    }),
    container: (provided: any) => ({ ...provided, width: "100%" }),
    singleValue: (provided: any, state: any) => {
      return { ...provided };
    }
  };
  return (
    <Flex flex="1">
      <Select options={options} styles={customStyles} />
    </Flex>
  );
}
