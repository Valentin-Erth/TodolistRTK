import styled from 'styled-components'

export const Switch = styled.label`
  display: inline-block;
  position: relative;
  width: 48px;
  height: 24px;
`

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 30px;

  background-color: #42414d;
  transition: 0.4s;

  ::before {
    content: '';
    position: absolute;
    cursor: pointer;
    left: 4px;
    bottom: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: 0.4s;

    background-color: white;
  }
`

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;

  :checked + ${Slider} {
    background-color: #ebebeb;
  }

  :checked + ${Slider}::before {
    transform: translateX(22px);
    background-color: #42414d;
  }
`
