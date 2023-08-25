import { ReactNode, useEffect, MouseEvent } from 'react'

import FocusLock from 'react-focus-lock'


import React from 'react'
import { CloseButton, CloseIcon, ModalContainer, ModalHeader, ModalTitle, Overlay } from "common/components/Modal/styled";

type PropsType = {
  closeModal: () => void
  title: string
  children: ReactNode
}

export const Modal = ({ closeModal, children, title }: PropsType) => {
  useEffect(() => {
    document.addEventListener('keydown', handlerKeyPress)

    return () => {
      document.removeEventListener('keydown', handlerKeyPress)
    }
  }, [])

  const handlerKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal()
  }
  const handlerClickModalContainer = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

  return (
    <Overlay onClick={closeModal}>
      <FocusLock>
        <ModalContainer onClick={handlerClickModalContainer}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={closeModal}>
              <CloseIcon />
            </CloseButton>
          </ModalHeader>
          {children}
        </ModalContainer>
      </FocusLock>
    </Overlay>
  )
}
