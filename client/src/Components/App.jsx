import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import Footer from "./Footer";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

const QUERY = gql`
    {
        isLoggedIn @client
    }
`;

export default () => {
    const { data: { isLoggedIn } } = useQuery(QUERY);

    return (
        <ThemeProvider theme={Theme}>
            <Wrapper>
                <GlobalStyles/>
                <Router isLoggedIn={isLoggedIn}/>
                <Footer/>
            </Wrapper>
        </ThemeProvider>
    );
}