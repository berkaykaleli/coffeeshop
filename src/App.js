import React from "react";
import styled from "styled-components";
import Coffees from "./Coffees";

import coffeeData from "./data/db.json";
import Searchbar from "./Searchbar";
import "./assets/styles/Main.css";

const App = () => {
  return (
    <Wrapper>
      <SearchbarWrapper>
        <Searchbar />
      </SearchbarWrapper>
      <CoffeesWrapper>
        {coffeeData.map((data, index) => {
          return (
            <Coffees
              key={index}
              title={data.title}
              description={data.description}
              ingredients={data.ingredients}
            />
          );
        })}
      </CoffeesWrapper>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
const SearchbarWrapper = styled.div`
  height: 100%;
`;
const CoffeesWrapper = styled.div``;
