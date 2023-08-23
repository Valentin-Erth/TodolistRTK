import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 70%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
`

export const EmptyTitle = styled.p`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.font.secondary};
  font-weight: 600;
`
