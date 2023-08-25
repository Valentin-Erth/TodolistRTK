import styled from 'styled-components'

import bg from 'assets/img/bg-login.jpg'
import { baseTheme } from 'common/theme/theme'

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  // background-image: url(${bg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.59);
  `

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: absolute;
  top: 30px;
  right: 40px;
  color: white;
`

export const FormWrapper = styled.form`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  row-gap: 40px;
  padding: 20px;
  border-radius: 12px;
  width: 390px;
`

export const FlexWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  column-gap: 20px;
  color: white;
`

export const LoginTitle = styled.p`
  font-family: 'Montserrat';
  font-size: 24px;
  color: #ffffff;
  font-weight: 800;
  text-align: center;
`

export const InputLogin = styled.input`
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  color: #333;
  display: block;
  background: #fff;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 53px;
  outline: none;
  border: none;
  width: 100%;
  position: relative;
`

export const ErrorMessage = styled.p`
  position: absolute;
  font-weight: 500;
  color: ${baseTheme.colors.danger};
  z-index: 10;
  padding: 7px 10px;
  border-radius: 5px;
`

export const CaptchaContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
`

export const CaptchaImg = styled.img`
  width: 200px;
`

export const ButtonLogin = styled.button`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 15px;
  line-height: 1.5;
  color: #e0e0e0;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  transition: background 0.5s ease;
  position: relative;
  border: none;
  cursor: pointer;

  :hover {
    background: #698cff;
    transition: background 0.5s ease;
  }
`
