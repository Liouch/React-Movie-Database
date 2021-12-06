import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../images/search-icon.svg";
import { Wrapper, Content } from "./SearchBar.styles";

type Props = {
  setMovieSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ setMovieSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setMovieSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setMovieSearch]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(e) => {
            setSearchTerm(e.currentTarget.value);
          }}
          value={searchTerm}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
