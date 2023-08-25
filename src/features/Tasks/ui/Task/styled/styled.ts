import { ReactComponent as Arrow } from 'assets/img/arrow-right.svg'
import { baseTheme } from 'common/theme/theme'
import { TaskPriorities } from "features/Tasks/api/tasks.types";
import styled, { css } from "styled-components";


export const TaskWrapper = styled.div`
  color: ${({ theme }) => theme.colors.font.primary};
  padding: 2vh 1.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    border-bottom: 1px solid grey;
  }
`

export const TaskFlexContainer = styled.div<{ width: string; colGap?: string }>`
  display: flex;
  align-items: center;
  column-gap: ${p => p.colGap || 'none'};
  width: ${p => p.width};
`

export const TaskPriorityFlex = styled(TaskFlexContainer)`
  justify-content: center;
`

export const TaskTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TaskPriority = styled.p<{ priority: TaskPriorities }>`
  font-size: 14px;
  padding: 6px 15px;
  border-radius: 30px;
  background-color: ${p => styledVariants[p.priority]};
  color: white;
`

export const ArrowRight = styled(Arrow)`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.font.primary};

  :hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`

const styledVariants: StyledVariants<TaskPriorities> = {
  [TaskPriorities.Low]: css`
    ${baseTheme.colors.warning}
  `,
  [TaskPriorities.Medium]: css`
    ${baseTheme.colors.secondary}
  `,
  [TaskPriorities.High]: css`
    ${baseTheme.colors.primary}
  `,
}

type StyledVariants<E extends number> = {
  [key in E]?: any
}
