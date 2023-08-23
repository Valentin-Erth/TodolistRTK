import styled from 'styled-components'

import { ReactComponent as Close } from 'assets/img/close.svg'

export const FormWrapper = styled.form`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 2vh;
  padding: 18px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.font.primary};
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TaskTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`

export const CloseIcon = styled(Close)`
  width: 27px;
  height: 27px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  stroke: ${({ theme }) => theme.colors.font.primary};

  :hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`

export const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 35px;
`

export const InputSetting = styled.input`
  width: 100%;
  background: none;
  font-family: 'Montserrat';
  padding: 7px 5px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font.primary};

  :focus {
    outline: ${({ theme }) => `1px solid ${theme.colors.font.primary}`};
  }
`

export const TextAreaSetting = styled.textarea`
  min-height: 100px;
  width: 100%;
  background: none;
  font-family: 'Montserrat';
  padding: 7px 5px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  font-weight: 600;
  resize: none;
  color: ${({ theme }) => theme.colors.font.primary};

  :focus {
    outline: ${({ theme }) => `1px solid ${theme.colors.font.primary}`};
  }
`

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`

export const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 10px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
`
export const ButtonSetting = styled.button`
  font-family: 'Montserrat';
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #c7c7c7;
  cursor: pointer;

  :hover {
    box-shadow: 5px 6px 6px #888888;
  }
`

export const ButtonSave = styled(ButtonSetting)`
  background-color: #ffd43b;
  border: none;
`
export const ButtonDelete = styled(ButtonSetting)`
  background: none;
  color: ${({ theme }) => theme.colors.font.primary};
`
