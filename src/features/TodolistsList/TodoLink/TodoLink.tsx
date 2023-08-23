import { useState } from "react";
import { useMatch } from "react-router-dom";
import { LinkTitle, SettingIcon, SuperLink, SuperLinkContent } from "./styled/styled";
import { PortalModal } from "components";
import { EditTodoModal } from "features/TodolistsList/EditTodoModal/EditTodoModal";
import React from "react";

type TodoLinkPropsType = {
  id: string
  title: string
}

export const TodoLink = ({ id, title }: TodoLinkPropsType) => {
  const match = useMatch(`/todos/${id}/*`);
  const [openModal, setOpenModal] = useState(false);

  const handlerOpenModal = () => setOpenModal(true);

  return (
    <>
      <SuperLink to={`/todos/${id}`} match={match ? "isActive" : ""}>
        <SuperLinkContent>
          <LinkTitle>{title}</LinkTitle>
          {match && <SettingIcon onClick={handlerOpenModal} />}
        </SuperLinkContent>
      </SuperLink>

      <PortalModal show={openModal} setShow={setOpenModal} title={"Edit Project"}>
        <EditTodoModal title={title} id={id} closeModal={setOpenModal} />
      </PortalModal>
    </>
  );
};
