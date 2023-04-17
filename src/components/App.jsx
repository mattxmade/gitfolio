import React, { useState, useRef } from "react";

import content from "../content";
import Group from "./Group";

const App = () => {
  const modalRef = useRef();

  const [currentProject, setCurrentProject] = useState();

  const handleDialogVisibility = (action) =>
    action === "show" ? modalRef.current.showModal() : modalRef.current.close();

  const handleSelectProject = (selectedProject) => {
    setCurrentProject(selectedProject);
    handleDialogVisibility("show");
  };

  return (
    <div className="wrapper">
      <div className="overlay">
        <header></header>

        <dialog ref={modalRef}>
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

        <footer></footer>
      </div>
    </div>
  );
};

export default App;
