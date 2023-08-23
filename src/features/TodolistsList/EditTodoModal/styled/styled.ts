import styled from 'styled-components'

export const Input = styled.input`
  display: block;
  background: #fff;
  width: 100%;
  border-radius: 5px;
  padding: 10px 10px;
  outline: none;
  border: 1px solid black;

  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  color: #333;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`

export const ButtonDelete = styled.button`
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #c7c7c7;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.font.primary};

  :hover {
    background-color: tomato;
    border: 1px solid tomato;
  }
`

export const ButtonSave = styled(ButtonDelete)`
  background-color: #ffd43b;
  border: none;
  color: black;

  :hover {
    background-color: #fdc918;
    border: none;
  }
`
