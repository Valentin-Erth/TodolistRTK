import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Setting } from 'assets/img/setting.svg'

export const SuperLink = styled(Link)<{ match: string }>`
  padding: 1.5vh 1vw;
  border-radius: 1vh;

  color: ${({ theme }) => theme.colors.font.primary};
  font-size: 16px;
  font-weight: ${p => (p.match ? 700 : 400)};
  background-color: ${p => (p.match ? p.theme.colors.bg.active : 'none')};
  text-decoration: none;
`

export const SuperLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LinkTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  white-space: nowrap;
  padding-right: 10px;
`

export const SettingIcon = styled(Setting)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  fill: ${({ theme }) => theme.colors.font.primary};

  :hover {
    fill: ${({ theme }) => theme.colors.primary};
  }
`
