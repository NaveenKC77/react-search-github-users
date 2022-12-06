import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import Card from "./Card";
import Followers from "./Followers";
const User = () => {
  return (
    <Wrapper className="section-center">
      <Card></Card>
      <Followers></Followers>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  margin-top: 1rem;
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
