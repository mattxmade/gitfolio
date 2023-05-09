"use client";

import React, { useState, useRef } from "react";

import Modal from "./components/Modal";
import Group from "./components/Group";

import { ProjectContext } from "./utils/Contexts";

import content from "./data/content";

const Main = () => {
  const modalRef = useRef<any | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<any | null>(null);

  const handleDialogVisibility = (action: string) =>
    action === "show" ? modalRef.current.showModal() : modalRef.current.close();

  const handleSelectProject = (selectedProject: any) => {
    setCurrentProject(selectedProject);
    handleDialogVisibility("show");
  };

  const states = {
    isModalOpen,
    setIsModalOpen,
    currentProject,
    setCurrentProject,
  };

  return (
    <ProjectContext.Provider value={states as any}>
      <dialog open={isModalOpen} ref={modalRef}>
        {currentProject ? (
          <Modal
            project={currentProject}
            handleDialogVisibility={handleDialogVisibility}
          />
        ) : null}
      </dialog>

      <main>
        <section>
          <Group
            id="vanilla"
            heading="HTML CSS JavaScript"
            projects={content.vanilla}
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            id="design"
            heading="Design briefs | Repsonsive design"
            projects={content.briefs}
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            id="react"
            heading="React"
            projects={content.react}
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            id="threejs"
            heading="ThreeJS"
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
            handleSelectProject={handleSelectProject}
          />
        </section>
      </main>
    </ProjectContext.Provider>
  );
};

export default Main;
