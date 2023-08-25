import styled from 'styled-components'

import { ReactComponent as Add } from 'assets/img/add.svg'

export const TasksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 1vw;
`

export const TasksContent = styled.div`
  width: 100%;
  overflow-y: auto;
`

export const TasksTitle = styled.p`
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.font.primary};
`

export const AddNewTaskWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${theme.colors.font.primary}`};
  padding: 0 1.5vw;
  border-radius: 5px;
  margin-bottom: 10px;
`

export const InputAddTask = styled.input`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 15px;
  line-height: 1.5;
  width: 95%;
  height: 40px;
  padding-right: 10px;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.colors.font.primary};
`

export const AddTaskButton = styled.button`
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background: none;

  :hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`

export const AddTaskIcon = styled(Add)`
  width: 32px;
  height: 32px;
  padding: 5px;
  stroke: ${({ theme }) => theme.colors.font.primary};
`
