import { ReactComponent as EmptyIcon } from 'assets/img/empty-folder.svg'
import { EmptyTitle, Wrapper } from "features/tasks/EmptyTaskList/styled";
import React from 'react';


export const EmptyTaskList = () => {
  return (
    <Wrapper>
      <EmptyIcon stroke={'#b4b4b4'} width={80} height={80} />
      <EmptyTitle>Empty Task List</EmptyTitle>
    </Wrapper>
  )
}
