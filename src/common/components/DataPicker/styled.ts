import styled from 'styled-components'

export const InputDate = styled.input`
  background-color: ${({ theme }) => theme.colors.bg.active};
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.font.primary};

  font-family: 'Montserrat';
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 5px;

  ::-webkit-calendar-picker-indicator {
    background-color: white;
    cursor: pointer;
    border-radius: 3px;
  }
`
