import React, { useCallback, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { appActions, initializeAppTC } from "app/app.slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "features/Login/Login";
import { logoutTC } from "features/Login/auth.slice";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { selectIsInitialized, selectStatus, themeSelector } from "app/app.selectors";
import { selectIsLoggedIn } from "features/Login/auth.selectors";
import { darkTheme, lightTheme } from "common/theme/theme";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(themeSelector);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const dispatch = useDispatch<any>();

  useLayoutEffect(() => {
    dispatch(appActions.setTheme({theme: "light" }));
  }, []);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%"
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <div className="App">
          <ErrorSnackbar />
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6">News</Typography>
              {isLoggedIn && (
                <Button color="inherit" onClick={logoutHandler}>
                  Log out
                </Button>
              )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
          </AppBar>
          <Container fixed>
            <Routes>
              <Route path={"/"} element={<TodolistsList demo={demo} />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
