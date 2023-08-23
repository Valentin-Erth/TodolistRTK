import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`

export const MainWrapper = styled.div`
  height: 96vh;
  width: 80vw;
  margin: 2vh 1vw 2vh 1vw;
  border-radius: 2vh;
`