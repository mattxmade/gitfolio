"use client";

import React, { useState, useRef } from "react";

import Modal from "./components/Modal";
import Group from "./components/Group";

import { ProjectContext, IProjectContextProvider } from "./utils/Contexts";

import content from "./data/content";

const Main = () => {
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

      <main>
        <section>
          <Group
            id="vanilla"
            heading="HTML CSS JavaScript"
            projects={content.vanilla}
          />
        </section>

        <section>
          <Group
            id="design"
            heading="Design briefs | Repsonsive design"
            projects={content.briefs}
          />
        </section>

        <section>
          <Group id="react" heading="React" projects={content.react} />
        </section>

        <section>
          <Group
            id="threejs"
            heading="ThreeJS"
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
          />
        </section>
      </main>
    </ProjectContext.Provider>
  );
};

export default Main;
