import React, { useEffect, useLayoutEffect } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useSelector } from "react-redux";
import { appActions, appThunks } from "app/app.slice";
import {
  CircularProgress, LinearProgress
} from "@mui/material";
import { selectIsInitialized, selectStatus, themeSelector } from "app/app.selectors";
import { selectIsLoggedIn } from "features/Login/auth.selectors";
import { darkTheme, lightTheme } from "common/theme/theme";
import { loadTheme } from "common/utils/localStorage-utils";
import { Pages } from "Pages";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { LinerProgress } from "components/LinerProgress/LinerProgress";
import { ProgressWrapper } from "app/styled";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(themeSelector);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(appActions.setTheme(loadTheme()));
  }, []);

  useEffect(() => {
    dispatch(appThunks.initializeApp());
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
      <ProgressWrapper>
        {status === "loading" && <LinearProgress />}
      </ProgressWrapper>
      <Pages />
      <ErrorSnackbar />
    </ThemeProvider>
  );
}

export default App;

