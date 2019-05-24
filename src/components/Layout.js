import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPollH,
  faUserEdit
} from "@fortawesome/pro-regular-svg-icons";
import { Link } from "@reach/router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CssBaseline from "@material-ui/core/CssBaseline";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 16px);
  margin: auto;
  width: 90vw;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  img {
    max-width: 100%;
  }
  nav {
    position: relative;
    margin-top: auto;
    .nav-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;
    }
    a {
      width: 25%;
      border: 1px solid #acacac;
      background-color: transparent;

      svg {
        max-height: 100%;
        width: 100%;
      }
      button {
        margin: auto;
        display: block;
        background: transparent;
        border: none;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        height: 100vh;
    }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Helmet>
      <CssBaseline />
      <GlobalStyle />
      {children}
      <nav>
        <BottomNavigation className="nav-wrapper">
          <Link to="/">
            <BottomNavigationAction
              type="button"
              aria-labelledby="homeScreen camera"
              icon={<FontAwesomeIcon icon={faCamera} size="2x" />}
            />
          </Link>
          <Link to="/form">
            <BottomNavigationAction
              type="button"
              aria-labelledby="submitForm"
              icon={<FontAwesomeIcon icon={faPollH} size="2x" />}
            />
          </Link>
          <Link to="/">
            <BottomNavigationAction type="button" disabled />
          </Link>
          <Link to="/user">
            <BottomNavigationAction
              type="button"
              aria-labelledby="settingsScreen"
              icon={<FontAwesomeIcon icon={faUserEdit} size="2x" />}
            />
          </Link>
        </BottomNavigation>
      </nav>
    </Container>
  );
};
export default Layout;
