"use client";

import React, { useState, useRef } from "react";

import Modal from "./components/Modal";
import { ProjectContext, IProjectContextProvider } from "./utils/Contexts";

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const states = {
    isModalOpen,
    setIsModalOpen,
    currentProject,
    setCurrentProject,
  } as IProjectContextProvider;

  return (
    <ProjectContext.Provider value={states}>
      <dialog open={isModalOpen} ref={modalRef}>
        {currentProject ? <Modal project={currentProject} /> : null}
      </dialog>

      <main>{props.children}</main>
    </ProjectContext.Provider>
  );
};

export default Main;

// Pass Server components as children | this "hole" will be filled by RSC when RCC has rendered client side
// https://nextjs.org/docs/getting-started/react-essentials#recommended-pattern-passing-server-components-to-client-components-as-props
