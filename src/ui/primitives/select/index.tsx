import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { Flex } from "rebass";
import Theme from "../../theme";

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
      color: "white"
    }),
    control: (provided: any) => ({
      ...provided,
      padding: 0,
      minHeight: "25px",
      height: "25px",
      backgroundColor: Theme.colors.textBoxColor,
      color: Theme.colors.textColor,
      border: `1px solid ${Theme.colors.textboxBorder}`,
      fontSize: "11px"
    }),
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      color: Theme.colors.textColor
    }),
    singleValue: (provided: any, state: any) => {
      return { ...provided, color: Theme.colors.textColor };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: Theme.colors.textColor
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: Theme.colors.textBoxColor
    }),
    menu: (provided: any) => ({
      ...provided,
      padding: "0px",
      backgroundColor: Theme.colors.textBoxColor
    })
  };
  return (
    <Flex flex="1">
      <Select options={options} styles={customStyles} />
    </Flex>
  );
}
