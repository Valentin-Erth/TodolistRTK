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
  position: relative;

  :focus {
    border: 1px solid black;
  }
`

export const ErrorMessage = styled.p`
  position: absolute;
  font-weight: 500;
  margin-top: 5px;
  color: red;
`

export const ButtonAddTodo = styled.button`
  margin-top: 40px;
  width: 100%;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #ffd43b;
  cursor: pointer;
`
