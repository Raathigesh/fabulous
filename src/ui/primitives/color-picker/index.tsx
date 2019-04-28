import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";

const Container = styled.div``;
const Preview = styled.div`
  width: 100px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid gray;
  cursor: pointer;
`;
const PopOver = styled.div`
  position: absolute;
`;

const Blanket = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("transparent");
  const handleColorChange = (color: any) => setSelectedColor(color.hex);
  const handlePreviewClick = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Preview
        style={{ backgroundColor: selectedColor }}
        onClick={handlePreviewClick}
      />
      {isOpen && (
        <Fragment>
          <Blanket onClick={handlePreviewClick} />
          <PopOver>
            <SketchPicker
              color={selectedColor}
              onChangeComplete={handleColorChange}
            />
          </PopOver>
        </Fragment>
      )}
    </Container>
  );
}
