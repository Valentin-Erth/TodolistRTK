import { useNavigate } from 'react-router-dom'

import { ReactComponent as NotFoundIcon } from 'assets/img/monster-404.svg'

import React from 'react'
import { Button, Wrapper } from "common/components/NotFound/styled";

 const NotFound = () => {
  const navigate = useNavigate()

  const handlerGoToHome = () => {
    navigate('/')
  }

  return (
    <Wrapper>
      <NotFoundIcon height={450} />
      <Button onClick={handlerGoToHome}>BACK TO HOME</Button>
    </Wrapper>
  )
}
export default NotFound