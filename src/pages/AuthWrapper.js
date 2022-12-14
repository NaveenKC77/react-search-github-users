import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
function AuthWrapper({ children }) {
  const { isLoading, isError } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading">
          <img src={loadingGif} className="loading-img" alt="" />
        </div>
      </Wrapper>
    );
  }
  if (isError) {
    return (
      <Wrapper>
        <div className="error"></div>
      </Wrapper>
    );
  }
  return children;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
