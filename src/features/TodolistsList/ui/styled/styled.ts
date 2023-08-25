import styled from 'styled-components'

import { ReactComponent as Add } from 'assets/img/add.svg'
import { ReactComponent as SignOutIcon } from 'assets/img/sign-out.svg'

export const TodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 18vw;
  min-height: 94vh;
  padding: 2vh 1vw;
  margin: 2vh 1vw;

  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 2vh;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.font.primary}`};
  padding: 0 0 2vh;
`

export const TodosTitle = styled.h2`
  color: ${({ theme }) => theme.colors.font.primary};
`

export const AddTodoIcon = styled(Add)`
  width: 32px;
  height: 32px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  stroke: ${({ theme }) => theme.colors.font.primary};

  :hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`

export const TodosLinkTitle = styled.p`
  margin-top: 2vh;
  font-size: 14px;
  font-weight: 900;
  padding: 1vh 0 0 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.font.primary};
`

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 10px;
`

export const ToggleText = styled.p`
  color: ${({ theme }) => theme.colors.font.primary};
`

export const SignOut = styled(SignOutIcon)`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colors.font.primary};
`

export const SignOutButton = styled.div`
  display: flex;
  width: fit-content;
  column-gap: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.font.primary};

  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  :hover ${SignOut} {
    fill: ${({ theme }) => theme.colors.primary};
  }
`
