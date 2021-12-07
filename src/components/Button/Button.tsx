import React from "react";

import { Wrapper } from "./Button.styles";

type Props = {
  text: string;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
};

const Button = ({ text, callback }: Props) => (
  <Wrapper type="button" onClick={() => callback(true)}>
    {text}
  </Wrapper>
);

export default Button;
