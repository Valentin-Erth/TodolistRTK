import { useEffect } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { selectStatus } from "app/app.selectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { LayoutWrapper, MainWrapper } from "common/hoc/styled";
import { Todolists } from "features/TodolistsList/TodolistsList";
import React from 'react';
import { todolistsThunks } from "features/TodolistsList/todolists.slice";


export const Layout = () => {
  const isLoggedIn = useSelector(selectStatus)
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
        <Outlet />
      </MainWrapper>
    </LayoutWrapper>
  )
}


