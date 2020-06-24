import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import Client from "../Apollo/Client";

export default () => (
    <ThemeProvider theme={Theme}>
        <ApolloProvider client={Client}>
            <GlobalStyles/>
            <Router isLoggedIn/>
        </ApolloProvider>
    </ThemeProvider>
);