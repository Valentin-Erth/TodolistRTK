import { Suspense, useEffect } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { LayoutWrapper, MainWrapper } from "common/hoc/styled";
import { Todolists } from "features/TodolistsList/ui/TodolistsList";
import React from 'react';
import { todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import { selectIsLoggedIn } from "features/Login/model/auth.selectors";
import { ErrorBoundary } from 'react-error-boundary';


export const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(todolistsThunks.fetchTodolists())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <LayoutWrapper>
      <Todolists />
      <MainWrapper>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<p>...Loading</p>}>
            <Outlet />
          </Suspense >
        </ErrorBoundary>

      </MainWrapper>
    </LayoutWrapper>
  )
}


