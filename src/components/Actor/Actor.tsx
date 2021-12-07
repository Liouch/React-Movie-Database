import { Wrapper, Image } from "./Actor.styles";

type Props = {
  name: string;
  character: string;
  imageUrl: string;
};

const Actor = ({ name, character, imageUrl }: Props) => (
  <Wrapper>
    <Image src={imageUrl} alt="actor-thumb" />
    <h3>{name}</h3>
    <p>{character}</p>
  </Wrapper>
);
export default Actor;
