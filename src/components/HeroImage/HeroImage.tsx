import React from "react";

import { Wrapper, Content, Text } from "./HeroImage.styles";

export type Props = {
  image?: string;
  title?: string;
  text?: string;
};

const HeroImage = ({ image, title, text }: Props) => {
  return (
    <Wrapper image={image}>
      <Content>
        <Text>
          <h1>{title}</h1>
          <p>{text}</p>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default HeroImage;
