import styled, { css, keyframes } from 'styled-components'

import { ReactComponent as Close } from 'assets/img/close.svg'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(23, 23, 23, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
  z-index: 1;
  animation-duration: 400ms;
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }

  & * {
    max-height: 95%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`
export const ModalContainer = styled.div`
  width: 395px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  position: relative;
  border-radius: 5px;
  padding: 20px;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ModalTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.font.primary};
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`
export const CloseIcon = styled(Close)`
  width: 26px;
  height: 26px;
  padding: 5px;
  stroke: ${({ theme }) => theme.colors.font.primary};
`
