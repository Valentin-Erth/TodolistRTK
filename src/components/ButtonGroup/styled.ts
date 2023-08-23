import styled from 'styled-components'

export const Wrapper = styled.div`
  display: inline-flex;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`

export const Input = styled.input`
  display: none;

  :checked + label {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Label = styled.label`
  width: 100%;
  text-align: center;
  padding: 8px 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.font.primary};
  background-color: ${({ theme }) => theme.colors.bg.active};
  cursor: pointer;
  transition: background-color 0.1s;
  user-select: none;

  :checked {
    background-color: red;
  }

  :not(:last-of-type) {
    border-right: 1px solid rgb(189, 189, 189);
  }
`
