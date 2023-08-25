import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { appActions} from 'app/app.slice';
import { selectError } from "app/app.selectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { createPortal } from "react-dom";
import { InfoText, SnackbarWrapper } from "common/components/ErrorSnackbar/styled";
import { CloseIcon } from "common/components/Modal/styled";

export function ErrorSnackbar() {

    const errorMessage = useSelector(selectError);
    const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setOpen(true)
      // delay before closing
      setTimeout(() => handlerClose(), 3000)
    }
  }, [errorMessage])

  const handlerClose = () => {
    setOpen(false)
    //delay time when clicking on the close icon (for smooth animation)
    setTimeout(() => dispatch(appActions.setAppError({error: null })), 300)
  }

  if (!open) {
    return null
  }

    return createPortal(
      <SnackbarWrapper isActive={open}>
        <InfoText>{errorMessage}</InfoText>
        <CloseIcon onClick={handlerClose}>x</CloseIcon>
      </SnackbarWrapper>,
      document.body
    )
}
