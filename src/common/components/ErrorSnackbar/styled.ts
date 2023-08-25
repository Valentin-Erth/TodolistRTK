import styled, { keyframes } from 'styled-components'

import { ReactComponent as Close } from 'assets/img/close.svg'

const showUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const SnackbarWrapper = styled.div<{
  isActive: boolean
}>`
  position: fixed;
  display: flex;
  align-items: center;

  left: 20px;
  top: 20px;
  z-index: 99;

  padding: 0.75rem 1rem 0.75rem 1.25rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.danger};

  animation-duration: 400ms;
  animation-name: ${showUp};
  animation-fill-mode: backwards;
`

export const InfoText = styled.p`
  font-size: 1rem;
  color: white;
`

export const CloseIcon = styled(Close)`
  margin-left: 0.5rem;
  width: 25px;
  height: 25px;
  padding: 5px;
  stroke: white;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`
