import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`
export const Button = styled.button`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 15px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.font.primary};
  height: 50px;
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  transition: background 0.5s ease;
  position: relative;
  border: none;
  cursor: pointer;

  :hover {
    background: #407bff;
    transition: background 0.5s ease;
  }
`
