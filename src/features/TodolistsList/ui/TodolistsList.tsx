import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
   changeOrderTodolistTC, ChangeOrderTodoType,
  } from "features/TodolistsList/model/todolists.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

import { selectTodolists } from "features/TodolistsList/model/todolist.selectors";
import { themeSelector } from "app/app.selectors";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { appActions } from "app/app.slice";
import {
  AddTodoIcon, FlexWrapper,
  HeaderWrapper, LinkContainer,
  LinkWrapper, SignOut, SignOutButton, TodosLinkTitle,
  TodosTitle,
  TodosWrapper, ToggleText
} from "features/TodolistsList/ui/styled/styled";
import { TodoLink } from "features/TodolistsList/ui/TodoLink/TodoLink";
import { PortalModal, Toggle } from "common/components";
import { AddTodoModal } from "features/TodolistsList/ui/AddTodoModal/AddTodoModal";
import { authThunks } from "features/Login/model/auth.slice";



export const Todolists= () => {
  const todolists = useSelector(selectTodolists);
  const themeMode = useSelector(themeSelector);

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false)
  const handlerLogOut = () => dispatch(authThunks.logout())
  const handlerOpenModal = () => setShowModal(true)
  const handlerDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const payload: ChangeOrderTodoType = {
      todoId: result.draggableId,
      newTodoIndex: result.destination.index,
      oldTodoIndex: result.source.index,
    }

    dispatch(changeOrderTodolistTC(payload))
  }
  const handlerChangeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked

    dispatch(appActions.setTheme(value ? 'dark' : 'light'))
  }
  const TodosJSX = todolists.map((el, index) => (
    <Draggable key={el.id} draggableId={el.id} index={index}>
      {provided => (
        <LinkWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
        >
          <TodoLink id={el.id} title={el.title} />
        </LinkWrapper>
      )}
    </Draggable>
  ))



  return <>
    <TodosWrapper>
      <div>
        <HeaderWrapper>
          <TodosTitle>Menu</TodosTitle>
          <AddTodoIcon onClick={handlerOpenModal} />
        </HeaderWrapper>

        <TodosLinkTitle>Projects</TodosLinkTitle>

        <DragDropContext onDragEnd={handlerDragEnd}>
          <Droppable direction={'vertical'} droppableId={'todoArea'}>
            {provided => (
              <LinkContainer {...provided.droppableProps} ref={provided.innerRef}>
                {TodosJSX}
              </LinkContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div>
        <FlexWrapper>
          <Toggle checked={themeMode === 'dark'} onChange={handlerChangeToggle} />
          <ToggleText>{themeMode}</ToggleText>
        </FlexWrapper>

        <SignOutButton onClick={handlerLogOut}>
          <SignOut />
          <p>Sign out</p>
        </SignOutButton>
      </div>
    </TodosWrapper>
    <PortalModal show={showModal} setShow={setShowModal} title={'Add Project'}>
      <AddTodoModal setShow={setShowModal} />
    </PortalModal>
  </>;
};
